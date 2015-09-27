var application;

window.onload = function initialize()
{
    // Get canvas element:
    var canvas = document.getElementById("gl-canvas");

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
}