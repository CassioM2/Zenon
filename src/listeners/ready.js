module.exports = async function onReady() {

    this.log('[STATUS] Zenon status has been started.');

    const sleep = time => new Promise(resolve => {
        setTimeout(resolve, time)
    })
    let i;

    for (i=0; i<10;) {
        await sleep(15000)
        this.user.setActivity(`🙆 alegria para todos os meus ${this.users.filter(u => !u.bot).size} usuários!`, { url: 'https://twitch.tv/cassiolopes1'} );
        await sleep(15000)
        this.user.setActivity(`🌟 Caso encontre algum bug reporte-o e poderá receber recompensas!`, { url: 'https://twitch.tv/cassiolopes1'} );
        await sleep(15000)
        this.user.setActivity(`Netflix`, { type: "WATCHING" });
        await sleep(15000)
        this.user.setActivity(`Spotify`, { type: "LISTENING" });
    }
}