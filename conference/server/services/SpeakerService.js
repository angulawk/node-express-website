const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class SpeakerService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getNames() {
    const data = await this.getData();

    return data.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname
    }))
  }

  async getListShort() {
    const data = await this.getData();

    return data.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title
    }))
  }

  async getList() {
    const data = await this.getData();

    return data.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title,
      summary: speaker.summary
    }))
  }

  async getAllArtwork() {
    const data = await this.getData();
    const artWork = data.reduce((acc, elem) => {
      if(elem.artwork) {
        acc = [...acc, ...elem.artwork];
      }

      return acc;
    }, []);

    return artWork;
  }

  async getSpeaker(speakerShortName) {
    const data = await this.getData();

    const speakersList = data.map(speaker => ({
      name: speaker.name,
      shortname: speaker.shortname,
      title: speaker.title,
      summary: speaker.summary,
      description: speaker.description,
      artwork: speaker.artwork
    }));

    const shortname = speakersList.find(speaker => speaker.shortname === speakerShortName)

    return shortname;
  }

  async getSpeakerArtwork(speakerShortName) {
    const speaker = await this.getSpeaker(speakerShortName);
    
    return speaker.artwork;
  }

  async getData() {
    const data = await readFile(this.datafile, "utf8");

    if(!data) {
      return [];
    }

    return JSON.parse(data).speakers;
  }
}

module.exports = SpeakerService;