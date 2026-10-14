import dns from "node:dns/promises";
import net from "node:net";

/**
 * Checks whether an IP address belongs to private/internal networks
 */
export function isPrivateIp(ip) {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "0.0.0.0") return true;

  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    // 10.0.0.0/8
    if (parts[0] === 10) return true;
    // 172.16.0.0/12
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    // 192.168.0.0/16
    if (parts[0] === 192 && parts[1] === 168) return true;
    // 169.254.0.0/16 (Link-local / Cloud metadata service)
    if (parts[0] === 169 && parts[1] === 254) return true;
    // 127.0.0.0/8 (Loopback)
    if (parts[0] === 127) return true;
  } else if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower.startsWith("fe80:") || lower.startsWith("fc00:") || lower.startsWith("fd00:")) return true;
  }

  return false;
}

/**
 * Validates a target URL against SSRF attacks before allowing screenshots or fetching
 */
export async function validateSafeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);

    // Only allow http and https
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, reason: `Unsupported protocol: ${parsed.protocol}` };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Disallow localhost or internal names
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal")
    ) {
      return { valid: false, reason: `Disallowed hostname: ${hostname}` };
    }

    // Disallow non-standard ports
    const port = parsed.port ? parseInt(parsed.port, 10) : parsed.protocol === "https:" ? 443 : 80;
    if (port !== 80 && port !== 443) {
      return { valid: false, reason: `Disallowed port: ${port}` };
    }

    // Resolve IP address
    let addresses = [];
    try {
      const res = await dns.lookup(hostname, { all: true });
      addresses = res.map((r) => r.address);
    } catch (err) {
      return { valid: false, reason: `DNS lookup failed: ${err.message}` };
    }

    // Verify all resolved IPs are public
    for (const addr of addresses) {
      if (isPrivateIp(addr)) {
        return { valid: false, reason: `Resolved IP is private or restricted: ${addr}` };
      }
    }

    return { valid: true, url: parsed.href };
  } catch (err) {
    return { valid: false, reason: `Invalid URL: ${err.message}` };
  }
}
