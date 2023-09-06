const {Pool} = require("pg");

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }
    
    async getPlaylistSongs(playlistId) {
        const resultPlaylist = await this._pool.query({
            text: "SELECT id, name FROM playlists WHERE id = $1",
            values: [playlistId],
        });
        
        const result = await this._pool.query({
            text: `SELECT songs.song_id, songs.title, songs.performer
            FROM songs
            JOIN playlists_songs 
            ON songs.song_id = playlists_songs.song_id
            WHERE playlists_songs.playlist_id = $1`,
            values: [playlistId],
        });
        
        return {dataPlaylist: resultPlaylist.rows[0], songs: result.rows};
    }
}

module.exports = PlaylistService;