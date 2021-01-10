const canvas = document.querySelector("canvas")
const score = document.querySelector("#score")

// To get 2d animation from canvas
const c = canvas.getContext("2d")

// initialize canvas width and height
canvas.width = innerWidth
canvas.height = innerHeight - 3

const bubbleArray = []
const clickEventArray = []

let scoreCount = 0
// class for bubble
class Bubble {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fill()
    }
    update() {
        this.draw()
        this.radius += 0.5
        // Stop when two circles are correlates
        bubbleArray.forEach((bubble, bubbleIndex) => {
            let dist = Math.hypot(this.x - bubble.x, this.y - bubble.y) // To find distance between two bubble
            if ((dist - this.radius - bubble.radius) < 0.5 && bubble != this) {
                console.log(dist - this.radius - bubble.radius);
                // cancelAnimationFrame(animationId) // To stop the game 
            }
        })
    }
}

// class for user click event position
class ClickEvent {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 10
        this.color = "green"
    }
}

// To get new bubble
function getBubble() {
    let x = Math.random() * canvas.width // to make random x position
    let y = Math.random() * canvas.height // to make random y position
    let radius = 20
    let color = `rgba(${Math.random()*360},${Math.random()*270},${Math.random()*180},0.7)` // Randomizing the color
    bubbleArray.push(new Bubble(x, y, radius, color))
}

// to get more than one bubble
setInterval(
    getBubble, 500
)
let animationId

function animate() {
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    bubbleArray.forEach(
        bubble => {
            bubble.update()
        }
    )
    clickEventArray.forEach((click, clickIndex) => {
        // console.log(click.x , bubble.x , click.y , bubble.y);
        bubbleArray.forEach((bubble, bubbleIndex) => {
            let dist = Math.hypot(click.x - bubble.x, click.y - bubble.y) // To find distance between two bubble
            if ((dist - bubble.radius - click.radius) < 0) {
                bubbleArray.splice(bubbleIndex, 1)
                scoreCount += 1
                console.log(scoreCount);
                score.textContent = scoreCount
            }
            clickEventArray.splice(clickIndex, 1)
        })
    })

}

addEventListener("click", event => {
    clickEventArray.push(new ClickEvent(event.clientX, event.clientY - 18))
})

animate()