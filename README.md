# Next Conference

## TODO

- [ ] Migrate API routes from next-api
- [ ] Store users inside DatoCMS
- [ ] Export new ticket images from Figma
- [x] Do we want events? if no, remove `logEvent` code
- [x] Do we want Microlink OG speaker cards?
- [x] Set up new DatoCMS project that can be cloned
- [ ] Need to create and add `public/twitter-card.png`

Next Conference is an all-in-one starter kit to run your online conference. It was used to run Next Conf 2020, which had almost 40,000 live attendees. The entirety of this this platform can be run **100% free**. It includes the following features:

- Multiple stages with an embedded YouTube stream
- Sponsor expo, including individual virtual booths
- Career Fair, allowing attendees to network and find job opportunties
- Ticket registration and generation
- Speaker pages and bios
- Schedule

This platform is built upon three principles:

- **Delegation:** Running a conference is difficult – you have to **delegate** tasks to third-parties to ensure success. Certain elements of an online conference experience are tough to get right, and we'd rather lean on established, industry leading solutions.
- **Flexibility:** While delegating certain elements of the conference experience is helpful, it's also important to own the platform. That's why this template provides a **flexible** open-source codebase that can be modified for your event.
- **Reducing Risk:** It's inevitable something will go wrong during your event. This platform **reduces risk** by leaning on a dynamic site that outputs as static files. These static files are cached, ensuring your site is never down. Then, it uses [Serverless Functions]() to sprinkle dynamic content on top, which are hosted by a provider with 99.999% uptime.

### Built With

- Framework: [Next.js]()
  - [CSS Modules]()
  - [TypeScript]()
- CMS: [DatoCMS]()
- Chat: [Discord]()
- Videos: [YouTube]()
- Live Streaming: [Streamyard]()
- Hosting/Deployment: [Vercel]()
