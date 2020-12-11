module.exports = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  images: {
    domains: ['images.ctfassets.net'],
    imageSizes: [24, 64, 300]
  }
  // rewrites() {
  //   return [
  //     // Must use a proxy URL to enable downloading
  //     {
  //       source: '/download-ticket/:path{/}?',
  //       destination: `${constantsJson.TICKET_IMAGE_URL}/Nextjs-Conf-Ticket.png?username=:path`
  //     }
  //   ];
  // }
};
