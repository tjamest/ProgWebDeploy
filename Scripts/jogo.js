const canvas = document.querySelector("canvas")
const scoreEl = document.querySelector("#scoreEl")
const c = canvas.getContext("2d")


const urlParams = new URLSearchParams(window.location.search);
const dificuldade = urlParams.get('dificuldade');

canvas.width = 1024 
canvas.height = 576

// ta funcionando
class Player{
    constructor(){
        
        this.speed = {
            x: 0,
            y: 0
        }
        this.opacity = 1
        const imagem =  new Image()
        imagem.src = '../Imagens/spaceship.png'
        imagem.onload = () =>{
            const escala = 0.15
            this.imagem = imagem
            this.width = imagem.width * escala
            this.height = imagem.height * escala
            this.position = {
                x: canvas.width / 2 - this.width / 2, //posição de inicio no meio da tela para x
                y: canvas.height - this.height - 20 //posição de inicio no final da tela para y
            }
        }
    }

    draw(){
        c.save()
        c.globalAlpha = this.opacity
        
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y,this.width,this.height)
        if(this.imagem) 
            c.drawImage(this.imagem, this.position.x,this.position.y,this.width,this.height)

        c.restore()
    }

    update() {
        if(this.imagem){
            this.draw()
            this.position.x += this.speed.x  
        }
    }

    }



    class Invader{
        constructor({position}){
            
            this.speed = {
                x: 0,
                y: 0
            }
            const imagem =  new Image()
            imagem.src = '../Imagens/invader.png'
            imagem.onload = () =>{
                const escala = 1
                this.imagem = imagem
                this.width = imagem.width * escala
                this.height = imagem.height * escala
                this.position = {
                    x: position.x,
                    y: position.y
                }
            }
        }
    
        draw(){
            //c.fillStyle = 'red'
            //c.fillRect(this.position.x, this.position.y,this.width,this.height)
            if(this.imagem) 
                c.drawImage(this.imagem, this.position.x,this.position.y,this.width,this.height)
        }
    
        update({speed}) {
            if(this.imagem){
                this.draw()
                this.position.x += speed.x  
                this.position.y += speed.y  
            }
        }

        shoot(InvaderProjectiles){
            InvaderProjectiles.push(new InvaderProjectile({
                position: {
                    x:this.position.x + this.width/2,
                    y: this.position.y + this.height
                },
                speed: {
                    x:0,
                    y:5
                }
            }))


        }
    
        }


    class Grid {
        constructor(){
            this.position = {
                x: 0,
                y: 0
            }

            this.speed = {
                x: 3,
                y: 0
            }

            this.invaders = [] 

            

            // AJUSTAR DIFICULDADE AQUI
            const columns = Math.floor(Math.random() * 10 + 4)
            const rows = Math.floor(Math.random() * 5 + 2)
            
            this.width = columns * 30

            for (let x = 0; x <columns; x++){
                for (let y = 0; y <rows; y++){
                this.invaders.push(
                    new Invader({
                        position: {
                            x: x * 30,
                            y: y * 30
                        }
                    }
                    )
                )
            }
        }
    }

    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        this.speed.y = 0

        if(this.position.x + this.width >= canvas.width || this.position.x <=0){
            this.speed.x = -this.speed.x
            this.speed.y = 30
        }
    }
}


class Projectile {
  constructor({ position, speed, color = 'red' }) {
    this.position = position
    this.speed = speed

    this.radius = 4
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.speed.x
    this.position.y += this.speed.y
  }
}

class Particle {
    constructor({ position, speed,radius, color ,fades }) {
      this.position = position
      this.speed = speed
  
      this.radius = radius
      this.color = color
      this.opacity = 1
      this.fades = fades 
    }
  
    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
  
    update() {
      this.draw()
      this.position.x += this.speed.x
      this.position.y += this.speed.y
      if(this.fades)
      this.opacity -= 0.01
    }
  }

class InvaderProjectile {
    constructor({ position, speed, color = 'white' }) {
      this.position = position
      this.speed = speed
      this.width = 3
      this.height = 10
  
      
      this.color = color
    }
  
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
  
    update() {
      this.draw()
      this.position.x += this.speed.x
      this.position.y += this.speed.y
    }
  }

    


const player = new Player()
const projectiles = []
const grids = []
const InvaderProjectiles = []
const particles = []






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

let frames = 0
let spawninteval = (Math.floor(Math.random() * 500) + 500)
let game = {
    over: false,
    active: true
}

let score = 0

for (let i = 0; i<100; i++){
    particles.push(new Particle({
        position: {
            x:Math.random()* canvas.width,
            y:Math.random()* canvas.height
        },
        speed : {
            x: 0,
            y: 0.45
        },
        radius :Math.random() * 3,
        color: 'white' 
    }))
}

function createParticles({object,color,fades}){
    for (let i = 0; i<15; i++){
        particles.push(new Particle({
            position: {
                x:object.position.x + object.width/2,
                y:object.position.y + object.height/2
            },
            speed : {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius :Math.random() * 3,
            color: color || '#BAA0DE',
            fades 
        }))
    }
}

function animation() {
    if(!game.active) return
    requestAnimationFrame(animation)
    //console.log('teste')
    c.fillStyle = 'black' 
    c.fillRect(0,0,canvas.width,canvas.height)
    
    player.update() //desenha , atualiza speed player
    particles.forEach((particle,i) =>{
        if(particle.position.y - particle.radius >= canvas.height){
            particle.position.x = Math.random() * canvas.width
            particle.position.y = - particle.radius
        }
        if(particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(i,1) 
            }, 0)
        }else {
            particle.update()
        }
        
    })

    InvaderProjectiles.forEach((InvaderProjectile,index )=>{
        if(InvaderProjectile.position.y + InvaderProjectile.height >= canvas.height){ //limpa do vetor tiros inimigos que sairam do canvas
            setTimeout(() => {
                InvaderProjectiles.splice(index,1)
            },0)
        } else InvaderProjectile.update()



         //player  toma tiro do inimigo colisão
        if(InvaderProjectile.position.y + InvaderProjectile.height >= player.position.y &&
             InvaderProjectile.position.x + InvaderProjectile.width >=player.position.x && 
             InvaderProjectile.position.x <= player.position.x + player.width){
                console.log("end game")
                setTimeout(() => {
                    InvaderProjectiles.splice(index,1)
                    player.opacity = 0
                    game.over = true
                },0)

                setTimeout(() => {
                    game.active = false
                },2000)
                
                createParticles({
                    object: player,
                    color: 'white',
                    fades: true
                }) 
             }
        
    })






    projectiles.forEach(Projectile => {
        Projectile.update()
    })

    grids.forEach((grid,gridIndex) => {
        grid.update()
        //frequencia dos tiros dos inimigos
        if(frames % 100 === 0 && (grid.invaders.length) > 0){
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(InvaderProjectiles)
        }
     
        grid.invaders.forEach((invader,i)  => {
            invader.update({speed: grid.speed})

            projectiles.forEach((projectile,j) => {
                if(projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                     projectile.position.x + projectile.radius >= invader.position.x && 
                     projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                     projectile.position.y + projectile.radius >= invader.position.y){ //GAMBIARRA DE COLISÃO
                        
                        
                        createParticles({
                            object: invader,
                            fades: true
                        })
                        

                        setTimeout(() =>{
                            const invaderFound = grid.invaders.find(invader2 => {//GAMBIARRA DE COLISÃO melhorar mais
                                return invader2 === invader
                            })

                            const projectileFound = projectiles.find(projectile2 =>{//GAMBIARRA DE COLISÃO melhorar mais parte 2
                                return projectile2 === projectile
                            })
                            if(invaderFound && projectileFound){ // colidiram então remove projetil e inimigo.
                                score += 100
                                console.log(score)
                                scoreEl.innerHTML = score
                                grid.invaders.splice(i,1)
                                projectiles.splice(j,1)
                            }
                            if(grid.invaders.length > 0){
                                const firtInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length -1]
                                grid.width = lastInvader.position.x - firtInvader.position.x + lastInvader.width
                                grid.position.x = firtInvader.position.x
                            }                            
                    },0)
                }
            })
        })
    })

    if(keys.a.pressed && player.position.x >= 0){ //velocidade ao usar a tecla a para ir para esquerda
        player.speed.x = -5
    }else if (keys.d.pressed && player.position.x +player.width <= canvas.width ) {//velocidade ao usar a tecla d para ir para direita
        player.speed.x = 5
    }
    else {
        player.speed.x = 0 //parar de andar
    }

    if (frames %  spawninteval === 0) { //spawn rate dos grids de inimigos podemos mudar a dificuldade no jogo aqui também
        grids.push(new Grid())
        spawninteval = (Math.floor(Math.random() * 500) + 500)
        frames = 0
        console.log(spawninteval) // qual frame vai brotar o proximo inimigo
    }

    

    frames++ 
}


animation()



addEventListener('keydown',(event) =>{ //captura uso das teclas a,d,espaço
    //console.log(event.key)
    if(game.over) return
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
        projectiles.push(new Projectile({
            position: {
                x:player.position.x + player.width/2,
                y:player.position.y
            },
            speed: {
                x: 0,
                y: -20
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

