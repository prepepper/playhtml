$(document).ready(function() {
    const miniAni = (() => {
        let frame = 0,
            isAnimating = false,
            items = {},
            frames = [],
            lastFrame = 0;
        const artboard = document.getElementById('artboard');
        
        function calcTweenFrame(frame, a) {
        const tweenLength = a.tween.frame - a.frame + 1;
        const tweenFrame = frame - a.frame + 1;
        const tweenPercent = tweenFrame/tweenLength;
        const tweenVal = (from, to) => ((to-from)*tweenPercent) + from;
        const tf = {};
        if (a.pos && a.tween.pos) {
            const x = tweenVal(a.pos.x, a.tween.pos.x);
            const y = tweenVal(a.pos.y, a.tween.pos.y);
            tf.translate = `${x}, ${y}`;
        }
        if (a.scale != null && a.tween.scale != null) {
            tf.scale = tweenVal(a.scale, a.tween.scale);
        }
        if (a.rot && a.tween.rot) {
            const deg = tweenVal(a.rot.deg, a.tween.rot.deg);
            const x = tweenVal(a.rot.x, a.tween.rot.x);
            const y = tweenVal(a.rot.y, a.tween.rot.y);
            tf.rotate = `${deg}, ${x}, ${y}`;
        }
        return tf;
        }
        
        function drawFrame(frame) {
        const actions = frames.filter(f => (
            (f.frame === frame)
            || (f.tween && f.frame <= frame && f.tween.frame >= frame)
        ));
        actions.forEach(a => {
            let tf = {};
            const item = items[a.item];
            if (!item) return;
            
            if (a.pos) tf.translate = `${a.pos.x}, ${a.pos.y}`;
            if (a.scale != null) tf.scale = a.scale;
            if (a.rot) tf.rotate = `${a.rot.deg}, ${a.rot.x}, ${a.rot.y}`;
            
            if (a.tween) {
            tf = { ...tf, ...calcTweenFrame(frame, a) };
            }
            item.setAttribute(
            'transform',
            Object.keys(tf).map(p => `${p}(${tf[p]})`));
        })
        }
        
        function advanceFrame() {
        frame += 1;
    
        if (frame > lastFrame) {
            frame = 0;
        } else {
            drawFrame(frame);
        }
    
        if (isAnimating) {
            window.requestAnimationFrame(advanceFrame);
        }
        }
    
        function toggleAnimation() {
        isAnimating = !isAnimating;
        if (isAnimating) {
            window.requestAnimationFrame(advanceFrame);
        }
        }
        
        function setFrames(newFrames) {
        artboard.classList.remove('ready');
        isAnimating = false;
        frames = newFrames;
        items = {};
        lastFrame = 0;
        frames.forEach(f => {
            const tweenFrame = f.tween ? f.tween.frame : 0;
            lastFrame = Math.max(lastFrame, f.frame, tweenFrame);
            items[f.item] = items[f.item] || document.getElementById(f.item);
        });
        drawFrame(1);
        artboard.classList.add('ready');
        }
        
        return {
        toggleAnimation,
        setFrames,
        }; 
    })();
    
    miniAni.setFrames([
        {
        frame: 1,
        item: 'snow',
        pos: {x: 0, y: 374},
        },
        {
        frame: 1,
        item: 'iceberg',
        pos: {x: 0, y: 174},
        },
        {
        frame: 1,
        item: 'buddy',
        pos: {x: 342, y: 139},
        },
        {
        frame: 150,
        item: 'buddy',
        pos: {x: 342, y: 139},
        scale: 1,
        tween: {
            frame: 750,
            pos: {x: 1280, y: 220},
            scale: 0.5,
        }
        },
        {
        frame: 1,
        item: 'bear',
        pos: {x: 41, y: 482},
        },
        {
        frame: 1,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: -40, x: 0, y: 20 },
        tween: {
            frame: 50,
            rot: { deg: 0, x: 0, y: 20 },
        }
        },
        {
        frame: 55,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: 0, x: 0, y: 20 },
        tween: {
            frame: 95,
            rot: { deg: -40, x: 0, y: 20 },
        }
        },
        {
        frame: 100,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: -40, x: 0, y: 20 },
        tween: {
            frame: 155,
            rot: { deg: 0, x: 0, y: 20 },
        }
        },
        {
        frame: 380,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: 0, x: 0, y: 20 },
        tween: {
            frame: 400,
            rot: { deg: -40, x: 0, y: 20 },
        }
        },
        {
        frame: 400,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: -40, x: 0, y: 20 },
        tween: {
            frame: 450,
            rot: { deg: 0, x: 0, y: 20 },
        }
        },
        {
        frame: 455,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: 0, x: 0, y: 20 },
        tween: {
            frame: 495,
            rot: { deg: -40, x: 0, y: 20 },
        }
        },
        {
        frame: 500,
        item: 'bear-arm',
        pos: {x: 102, y: 117},
        rot: { deg: -40, x: 0, y: 20 },
        tween: {
            frame: 555,
            rot: { deg: 0, x: 0, y: 20 },
        }
        },
        {
        frame: 1,
        item: 'bird',
        pos: {x: 219, y: 496},
        },
        {
        frame: 1,
        item: 'bird-wing-left',
        rot: {deg: -40, x: 50, y: 124},
        },
        {
        frame: 250,
        item: 'bird-wing-left',
        rot: {deg: -40, x: 50, y: 124},
        tween: {
            frame: 300,
            rot: {deg: 40, x: 50, y: 124},
        },
        },
        {
        frame: 300,
        item: 'bird-wing-left',
        rot: {deg: 40, x: 50, y: 124},
        tween: {
            frame: 350,
            rot: {deg: -40, x: 50, y: 124},
        },
        },
        {
        frame: 1,
        item: 'bird-wing-right',
        rot: {deg: 40, x: 83, y: 124},
        },
        {
        frame: 250,
        item: 'bird-wing-right',
        rot: {deg: 40, x: 83, y: 124},
        tween: {
            frame: 300,
            rot: {deg: -40, x: 83, y: 124},
        },
        },
        {
        frame: 300,
        item: 'bird-wing-right',
        rot: {deg: -40, x: 83, y: 124},
        tween: {
            frame: 350,
            rot: {deg: 40, x: 83, y: 124},
        },
        },
        {
        frame: 1,
        item: 'walrus',
        pos: {x: 361, y: 523},
        },
        {
        frame: 1,
        item: 'walrus-arm',
        rot: {deg: 20, x: 94, y: 73},
        },
        {
        frame: 100,
        item: 'walrus-arm',
        rot: {deg: 20, x: 94, y: 73},
        tween: {
            frame: 150,
            rot: {deg: -90, x: 94, y: 73},
        }
        },
        {
        frame: 150,
        item: 'walrus-arm',
        rot: {deg: -90, x: 94, y: 73},
        tween: {
            frame: 170,
            rot: {deg: -70, x: 94, y: 73},
        }
        },
        {
        frame: 170,
        item: 'walrus-arm',
        rot: {deg: -70, x: 94, y: 73},
        tween: {
            frame: 190,
            rot: {deg: -90, x: 94, y: 73},
        }
        },
        {
        frame: 190,
        item: 'walrus-arm',
        rot: {deg: -90, x: 94, y: 73},
        tween: {
            frame: 210,
            rot: {deg: -70, x: 94, y: 73},
        }
        },
        {
        frame: 210,
        item: 'walrus-arm',
        rot: {deg: -70, x: 94, y: 73},
        tween: {
            frame: 230,
            rot: {deg: -90, x: 94, y: 73},
        }
        },
        {
        frame: 230,
        item: 'walrus-arm',
        rot: {deg: -90, x: 94, y: 73},
        tween: {
            frame: 280,
            rot: {deg: 0, x: 94, y: 73},
        }
        },
        {
        frame: 1,
        item: 'narwhal',
        pos: {x: 450, y: 527},
        },
        {
        frame: 250,
        item: 'narwhal',
        pos: {x: 450, y: 527},
        tween: {
            frame: 380,
            pos: {x: 450, y: -43},
        },
        },
        {
        frame: 1,
        item: 'narwhal-flipper',
        rot: {deg: 0, x: 165, y: 469},
        },
        {
        frame: 370,
        item: 'narwhal-flipper',
        rot: {deg: 0, x: 165, y: 469},
        tween: {
            frame: 430,
            rot: {deg: -40, x: 165, y: 469}
        },
        },
        {
        frame: 430,
        item: 'narwhal-flipper',
        rot: {deg: -40, x: 165, y: 469},
        tween: {
            frame: 530,
            rot: {deg: 40, x: 165, y: 469}
        },
        },
        {
        frame: 530,
        item: 'narwhal-flipper',
        rot: {deg: 40, x: 165, y: 469},
        tween: {
            frame: 630,
            rot: {deg: -40, x: 165, y: 469}
        },
        },
        {
        frame: 630,
        item: 'narwhal-flipper',
        rot: {deg: -40, x: 165, y: 469},
        tween: {
            frame: 730,
            rot: {deg: 40, x: 165, y: 469}
        },
        },
    ]);
    
    miniAni.toggleAnimation();
});