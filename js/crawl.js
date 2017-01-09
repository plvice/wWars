(function (window, document) {
    let starwars = {
        universe: document.getElementsByClassName('wrap')[0],
        ship: document.getElementsByClassName('wrapcontent')[0],
        player: document.getElementById('song'),

        shipLimit: function () {
            return (this.ship.offsetHeight/this.ship.offsetTop) * -100;
        },

        getCoordinates: function (object) {
            let top = 0;
            if (typeof object !== 'undefined') {
                top = object.style.top.toString();
                top = top.substr(0, top.length - 1);
            }
            return top;
        },

        jumpToNextGalaxy: function (current, distance, limit) {
            if (current >= limit) {
                let topPosition = parseInt(current) - parseInt(distance) + '%';
                this.ship.style.top = topPosition;
            }
        },

        returnToPreviousGalaxy: function (current, distance) {
            if (current <= 100) {
                let topPosition = parseInt(current) + parseInt(distance) + '%';
                this.ship.style.top = topPosition;
            }
        },

        hideNotification: function () {
            document.getElementsByClassName('scrollplease')[0]
                    .classList.add('scrollplease--hidden');
        }
    };

    let limit = starwars.shipLimit();
    let player = starwars.player;
    let latency = 3000;

    let tmt = setInterval(function () {
        player.pause();
    }, latency);

    window.addWheelListener(document, function(ship) {
        let direction = ship.deltaY;
        let shipPosition = starwars.getCoordinates(starwars.ship);
        let shipSpeed = 5;

        starwars.hideNotification();

        if (direction === 100) {
            starwars.jumpToNextGalaxy(shipPosition, shipSpeed, limit);
            clearInterval(tmt);
            tmt = setInterval(function () {
                player.pause();
            }, latency);
            player.play();
        }

        if (direction === -100) {
            starwars.returnToPreviousGalaxy(shipPosition, shipSpeed)
        }

        ship.preventDefault();
    });
})(window, document);
