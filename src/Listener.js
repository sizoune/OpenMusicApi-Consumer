class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const { dataPlaylist, songs} = await this._playlistService.getPlaylistSongs(
        playlistId
      );

      console.log(dataPlaylist);

      const result = await this._mailSender.sendEmail(
        targetEmail,
        dataPlaylist,
        JSON.stringify({
            playlist:{
                ...dataPlaylist,
                songs
            }
        })
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;