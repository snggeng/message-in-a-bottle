const bottles = [
    {
        "name": "bottle 1",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 2",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 3",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 4",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 5",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 6",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 7",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 8",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    },
    {
        "name": "bottle 9",
        "message": "i left a message in a bottle",
        "createdBy": "user 1",
        "created_at": "1524459021149",
        "updated_at": "1524459021149"
    }
]

$ = (queryString) => document.querySelector(queryString)

const shiftHue = (hue) => (hue + 1) % 360
const getColor = (hue) => `hsl(${hue}, 100%, 50%)`
const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min
const shiftVariation = () => Math.sin(Date.now() / 1000) * getRandomArbitrary(0.2, 0.5)
const shiftPosition = (x, y, z) => `${x} ${y} ${z}`

let hue = 0

// A FRAME OBJECTS
// Ocean
$('a-ocean').setAttribute('width', '50')
$('a-ocean').setAttribute('depth', '50')
$('a-ocean').setAttribute('density', '20')
$('a-ocean').setAttribute('position', '')
$('a-ocean').setAttribute('rotation', '-90 0 0')

// OPAQUE PLANE
$('#opaque').setAttribute('position', '0 -1.5 0')
$('#opaque').setAttribute('rotation', '-90 0 0')
$('#opaque').setAttribute('width', '50')
$('#opaque').setAttribute('height', '50')
$('#opaque').setAttribute('color', '#b76040')

// TRANSPARENT PLANE
$('#transparent').setAttribute('position', '0 0 0')
$('#transparent').setAttribute('rotation', '-90 0 0')
$('#transparent').setAttribute('width', '50')
$('#transparent').setAttribute('height', '50')
$('#transparent').setAttribute('material', 'opacity: 0.0; transparent: true')

// BOTTLES

AFRAME.registerComponent('random-bottles', {
    init: function () {
        var sceneEl = $('a-scene'); 
        for (let bottle of bottles) {
          let bottleEl = document.createElement('a-entity');
          let x = Math.random()*35-25;
          let y = -0.7;
          let z = Math.random()*43-25;
          //In case bottle is too close to platform
          // if (Math.abs(x) <= 4) { x = (x+1)*3}
          // if (Math.abs(z) <= 4) { z = (z+1)*3}
          bottleEl.className = 'bottle'
          bottleEl.setAttribute('gltf-model', "#bottle-3d");
          bottleEl.setAttribute('position', {x: x, y: y, z: z});
          bottleEl.setAttribute('rotation', {x: 20, y: 20, z: 20});
          bottleEl.setAttribute('scale', {x: 0.1, y: 0.1, z: 0.1});
          let animation = document.createElement('a-animation')
          animation.setAttribute('attribute', 'position')
          animation.setAttribute('dur', '3000')
          animation.setAttribute('from',  `${x} ${y} ${z}`)
          animation.setAttribute('to',  `${x} ${y + shiftVariation()} ${z}`)
          animation.setAttribute('direction', 'alternate-reverse')
          animation.setAttribute('repeat', 'indefinite')
          bottleEl.appendChild(animation)
          let textEl = document.createElement('a-text');
          textEl.setAttribute('value', bottle.name);
          textEl.setAttribute('align', "center");
          textEl.setAttribute('color', "#fff");
          textEl.setAttribute('side', "double");
          textEl.setAttribute('position', {x: x-0.2, y: y+1.5, z: z});
          textEl.setAttribute('geometry', {primitive: 'plane', width: 1.2, height: 0.3, side: "double"});
          textEl.setAttribute('material',{color: "#528ff2", side: "double"});
          // set modal on click trigger
          textEl.setAttribute('data-toggle', 'modal') 
          textEl.setAttribute('data-target', '#exampleModal')
          textEl.addEventListener('click', function (event) {
                // setTimeout(sceneEl.exitVR.bind(this), 1000);
                let esc =  new Event('keydown')
                esc.keyCode = 27
                setTimeout(sceneEl.dispatchEvent(esc), 1000)
                // console.log(event.detail)
            });
          sceneEl.append(textEl);  
          sceneEl.appendChild(bottleEl);
        }
    }
  })

let bottleItems = document.getElementsByClassName('bottle')
// Array.from(bottleItems).map(b => b.getAttribute('position')).map(b => console.log(b))
const animate = () => {
    hue = shiftHue(hue)
    const color = getColor(hue)
    $('a-sky').setAttribute('color', color)

    // animate
    requestAnimationFrame(animate)
}

// DOM ACTIONS
requestAnimationFrame(animate)