/* eslint-disable no-undef */

export default {
  loadMusic() {
    return fetch(`${API}/musicRankings`).then(res => {
      return res.json().then(data => {
        const [{ content: songs }] = data.result;
        if (songs && songs.length > 0) {
          const song = songs[Math.floor(Math.random() * (songs.length - 1))];
          return { author: song.author, title: song.title };
        }
        return undefined;
      });
    });
  },
};
