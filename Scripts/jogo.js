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

class Projetil{
    constructor({position,speed}){
        this.position = position
        this.speed = speed
        this.radius = 20

    }

    draw(){
        c.beginPath()
        c.arc(this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2)
        c.fillStyle = 'red'
        c.fill
        c.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}

    


const player = new Player()
const projetils = [new Projetil({
    position: {
        x:300,
        y:300
    },
    speed: {
        x:0,
        y:0
    }
})]
player.draw()

const keys = { //define como padrão de começo de jogo não ter nenhuma tecla pressionada.
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
    projetils.forEach(Projetil => {
        Projetil.update()
    })

    if(keys.a.pressed && player.position.x >= 0){ //velocidade ao usar a tecla a para ir para esquerda
        player.speed.x = -5
    }else if (keys.d.pressed && player.position.x +player.width <= canvas.width ) {//velocidade ao usar a tecla d para ir para direita
        player.speed.x = 5
    }
    else {
        player.speed.x = 0 //parar de andar
    }
}


animation()



addEventListener('keydown',(event) =>{ //captura uso das teclas a,d,espaço
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
        console.log("espaco")
        projetils.push(new Projetil({
            position: {
                x:300,
                y:300
            },
            speed: {
                x: 0,
                y: -5
            }
        }))
            break
    }
})

addEventListener('keyup',(event) =>{ //captura soltar as teclas a,d, espaço
    // console.log(event.key)
    switch (event.key){
        case 'a':
            keys.a.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break


    }
})

