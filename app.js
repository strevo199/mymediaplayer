
class AllSong{
    constructor(){
        this.songCollection = [
            {songName:'./audio/test2.mp3'},
            {songName:'./audio/test1.mp3'}, 
            {songName:'./audio/Maroon-5-Memories-01.mp3'},
            {songName:'./audio/test3.mp3'},
            
           
        ];
    }

    
}


const allsong = new AllSong()

class UI{
    constructor(duration){

        this.count = 0
        this.duration= duration
        this.menu = document.querySelector('.menu');
        this.myMenu = document.querySelector('.myMenu');
        this.play = document.querySelector('#play')
        this.reLoadASong = document.querySelector('#reLoadASong')
        this.song = document.querySelector('#song')
        
        this.forward = document.querySelector('#forward')
        this.appBody = document.querySelector('.appBody')
        this.modeSwitch = document.querySelector('.modeSwitch')
        this.backward = document.querySelector('#backward')
        

    } 

     playSongFromList(){
        const songs = allsong.songCollection.map(item => item.songName)
        const songList = UI.populationSongList()
        songList.forEach(song =>{
            song.addEventListener('click',e =>{
                this.myMenu.classList.add('close')
                this.myMenu.classList.remove('open')
                this.menu.innerHTML =`
                <div class="menu">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                </div>
            `
                if (e.target.id ==='playnow') {

                   let audio =  e.target.parentElement.childNodes[1];
                    let song = ''
                   const arrId = audio.id.split('-')
                    const mark = +arrId[1] 
                    const mysong =songs[mark];
                    // console.log(mark);
                    this.song.src = mysong
                    this.checkPlaying()
                    // let currentTitle = mysong.split('/')[2]
                    // songtile.innerHTML = currentTitle
                    this.song.play()
                    
                    this.updateTime() 
                }
                
            })
        })
    }
    static loadingSong(sog){
        const songtitle = document.querySelector('.songtitle')
    songtitle.textContent = sog
    const currentAudio = document.createElement('source')
    currentAudio.src = sog
    song.appendChild(currentAudio)
    }


    updateTime(){
        let timeDisplay = document.querySelector('.time-display')
        const  outline = document.querySelector('.outline')
        timeDisplay.textContent = '0:00'
        this.song.ontimeupdate = () => {
            this.duration = song.duration
            let currentTime = song.currentTime;
            console.log(this.duration);
            let elapsed = this.duration -currentTime;
            let second = Math.floor(elapsed % 60)
            let mintues = Math.floor(elapsed / 60)
            let timing = (currentTime/this.duration) * 100
            outline.style.width = `${timing}%`
            timeDisplay.textContent = `0${mintues}:${second}`
        }
    }

// this method will check if the menu is open or close;
    showMenu(target){
        if (target.classList.contains('menu')) {
            this.myMenu.classList.add('open')
            this.myMenu.classList.remove('close')
            this.menu.innerHTML ='<span class="closeme">&times;</span>'
                }
        else{
            this.myMenu.classList.add('close')
            this.myMenu.classList.remove('open')

            this.menu.innerHTML =`
                <div class="menu">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                </div>
            `
        }

    }

    nextSong(target){
        let songtile = document.querySelector('.songtitle')
        const songs = allsong.songCollection.map(item => item.songName)
        let songIndex = songs.length - 1
        // songIndex--;
        if (this.count < songIndex) {
            this.count++
         }else{
            this.count  = 0
        }
        songIndex = this.count
        const mysong =songs[songIndex];
    this.song.src = mysong
    let currentTitle = songs[songIndex].split('/')[2]
        songtile.innerHTML = currentTitle
        
    this.song.play()
    this.updateTime()
}

    
    preSong(){
        
        let songtile = document.querySelector('.songtitle')
        const songs = allsong.songCollection.map(item => item.songName)
        let songIndex = songs.length - 1
        if (this.count > 0) {
            this.count--
         }
         else{
            this.count  = songIndex
        }
        songIndex = this.count
        const mysong =songs[songIndex];
        this.song.src = mysong
        let currentTitle = songs[songIndex].split('/')[2]
        songtile.innerHTML = currentTitle
        this.song.play()
        this.updateTime()
        
    }

    checkPlaying(){ 
        const controlContainer = document.querySelector('.controlContainer')
        if (this.song.paused) {
            this.song.play()
            this.play.classList.add('fa-pause');
            this.play.classList.remove('fa-play');
            this.appBody.classList.add('playme');
        }else{
            this.appBody.classList.remove('playme');
            this.song.pause()
            this.play.classList.remove('fa-pause');
            this.play.classList.add('fa-play');

        } 

    }

    changeMode(mode){
        if (mode.classList.contains('darkMode')) {
            this.modeSwitch.classList.remove('darkMode')
            document.querySelector('.container').classList.add('light')
        }else{
            this.modeSwitch.classList.add('darkMode')
            document.querySelector('.container').classList.remove('light')
        }
    }
    

    static init(){
        let songtile = document.querySelector('.songtitle')
        const songs = allsong.songCollection.map(item => item.songName)
        let songIndex = songs.length - 1
        this.loadingSong(songs[songIndex])
        
        let currentTitle = songs[songIndex].split('/')[2]
        songtile.innerHTML = currentTitle
        this.count = songIndex
        
    }
    

    playSong(e){
        this.checkPlaying()
        this.updateTime()
        
    }

    reLoadSong(){
        this.song.currentTime = 0
        this.song.play()
        
    }

    static populationSongList(){
        const songs = allsong.songCollection.map(item => item.songName)
        const collectionSong = document.querySelector('.collection')
        let li = '';
        songs.forEach(song =>{ 
            // console.log(song);
            const sondID = `song-${songs.indexOf(song)}`;
            const songname = song.split('/')[2]
            li += `<li class="collection-item">
            <audio id = ${sondID} class="menusong" src =${song}>
            </audio> 
            <h3>${songname}</h3>
        <i class="fa fa-play" id="playnow" aria-hidden="true"></i>
    </li>
            `
        })
        collectionSong.innerHTML = li
        return collectionSong.childNodes
        
    }






    static initialState(){


        ui.menu.addEventListener('click',e =>{
            ui.showMenu(e.target)
        })

        ui.forward.addEventListener('click',e =>{
            ui.nextSong(e.target)
        })
        ui.backward.addEventListener('click',e =>{
            ui.preSong()
        })
        UI.populationSongList()
        ui.playSongFromList()
        

        ui.reLoadASong.addEventListener('click',e =>{
            ui.reLoadSong()
        })
        ui.play.addEventListener('click',e =>{
            
            ui.playSong(e)
        })
        ui.modeSwitch.addEventListener('click',e =>{
            ui.changeMode(e.target)
        })
        
    }


}







const ui = new UI()

UI.initialState()


UI.init()