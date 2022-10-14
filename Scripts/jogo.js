const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const urlParams = new URLSearchParams(window.location.search);
const dificuldade = urlParams.get('dificuldade');

canvas.width = innerWidth
canvas.height = innerHeight


class Player{
    constructor(){
        
        this.speed = {
            x: 0,
            y: 0
        }
        const imagem =  new Image()
        imagem.src = '../Imagens/spaceship.png'
        imagem.onload = () =>{
            const escala = 0.15
            this.imagem = imagem
            this.width = imagem.width * escala
            this.height = imagem.height * escala


            this.position = {
                x:  canvas.width / 2 - this.width / 2 , //posição de inicio no meio da tela para x
                y:  canvas.height - this.height - 20 //posição de inicio no final da tela para y
            }
        }
        
    }
    draw(){
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y,this.width,this.height)
        if(this.imagem) 
            c.drawImage(this.imagem, this.position.x,this.position.y,this.width,this.height)
    }

    update() {
        if(this.imagem){
            this.draw()
            this.position.x += this.speed.x  
        }
    }

    }

    


const player = new Player()

player.draw()

const keys = {
    a:{
        pressed: false
        
    },
    d:{
        pressed: false
    },
    espaco:{
        pressed: false
    }
}

function animation() {
    requestAnimationFrame(animation)
    //console.log('teste')
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update() //desenha , atualiza speed

    if(keys.a.pressed){
        player.speed.x = -5
    }else if (keys.d.pressed) {
        player.speed.x = 5
    }
    else {
        player.speed.x = 0
    }
}


animation()



addEventListener('keydown',(event) =>{
    //console.log(event.key)
    switch (event.key){
        case 'a':
            console.log("esquerda")
            keys.a.pressed = true
            break

        case 'd':
            console.log("direita")
            keys.d.pressed = true
            break

        case ' ' ://captura a tecla de espaço
        keys.espaco.pressed = true 
            break
    }
})

addEventListener('keyup',(event) =>{
    // console.log(event.key)
    switch (event.key){
        case 'a':
            keys.a.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break

        case ' ' ://captura a tecla de espaço
            
            break
    }
})

