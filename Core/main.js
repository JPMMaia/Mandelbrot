var application;

window.onload = function initialize()
{
    // Get canvas element:
    var canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setupEvents(canvas);

    // Initialize application:
    application = new Application();
    application.initialize(canvas);

    run();
};

function run()
{
    application.update();
    application.render();

    setTimeout(
        function()
        {
            requestAnimFrame(run);
        },
        30
    );
}

function setupEvents(canvas)
{
    window.onresize = function()
    {
        application.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    window.onkeydown = function(keyboardEvent)
    {
        application.getKeyboard().onKeyDown(keyboardEvent.keyCode);
    };
    window.onkeyup = function(keyboardEvent)
    {
        application.getKeyboard().onKeyUp(keyboardEvent.keyCode);
    };

    canvas.onmousedown = function(mouseEvent)
    {
        application.getMouse().onButtonDown(mouseEvent.button);
    };
    canvas.onmouseup = function(mouseEvent)
    {
        application.getMouse().onButtonUp(mouseEvent.button);
    };
    canvas.onmousemove = function(mouseEvent)
    {
        application.moveMouse(mouseEvent.x * 0.005, mouseEvent.y * 0.005);
    };
    canvas.onwheel = function(wheelEvent)
    {
        application.setZoom(wheelEvent.wheelDelta, wheelEvent.x, wheelEvent.y);
    };

    document.getElementById("SelectMode").onchange = function()
    {
        var option = document.getElementById("SelectMode").value;
        switch (option)
        {
            case "Mode 1":
                application.setMode(0);
                break;
            case "Mode 2":
                application.setMode(1);
                break;
            case "Mode 3":
                application.setMode(2);
                break;
        }
    };
}