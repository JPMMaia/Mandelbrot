function Application()
{
}

Application.prototype.initialize = function(canvas)
{
    // Set canvas:
    this.canvas = canvas;
    this.aspectRatio = this.canvas.width / this.canvas.height;

    // Create graphics object:
    this.graphics = new Graphics();
    this.graphics.initialize(canvas);

    // Create a scene:
    this.scene = new Scene();
    this.scene.initialize(this.graphics.gl, this.graphics.shaderManager, this.aspectRatio);

    // Set camera orthogonal mode:
    this.scene.setOrthogonalMode(this.aspectRatio);

    // Create a keyboard object:
    this.keyboard = new Keyboard();
    this.keyboard.initialize();

    // Create a mouse object:
    this.mouse = new Mouse();
    this.mouse.initialize();

    // Shader variables:
    this.centerX = 0;
    this.centerY = 0;
    this.zoom = 0.5;
    this.width = 2;
    this.height = 2;

    this.targetZoom = this.zoom;
    this.targetCenterX = this.centerX;
    this.targetCenterY = this.centerY;
    this.lerpAmount = 200;

    this.scene.setCenter(this.centerX, this.centerY);
    this.scene.setZoom(this.zoom);

    // Initialize time counter:
    this.startMilliseconds = Date.now();
};

Application.prototype.update = function()
{
    var currentMilliseconds = Date.now();
    var deltaMilliseconds = currentMilliseconds - this.startMilliseconds;
    this.startMilliseconds = currentMilliseconds;

    this.processKeyboardInput(deltaMilliseconds);
    this.processMouseInput(deltaMilliseconds);

    this.scene.setCenter(this.centerX, this.centerY);
    this.scene.setZoom(this.zoom);
};

Application.prototype.processKeyboardInput = function(deltaMilliseconds)
{
    // Z
    if(this.keyboard.isKeyDown(0x5A))
    {
        // Zoom in:
        this.setZoom(100.0, this.canvas.width / 2.0, this.canvas.height / 2.0);
    }

    // X
    if(this.keyboard.isKeyDown(0x58))
    {
        // Zoom out:
        this.setZoom(-100.0, this.canvas.width / 2.0, this.canvas.height / 2.0);
    }

    // Left arrow:
    if(this.keyboard.isKeyDown(0x25))
    {
        this.moveCenter(-0.1, 0.0);
    }

    // Up arrow:
    if(this.keyboard.isKeyDown(0x26))
    {
        this.moveCenter(0.0, 0.1);
    }

    // Right arrow:
    if(this.keyboard.isKeyDown(0x27))
    {
        this.moveCenter(0.1, 0.0);
    }

    // Down arrow:
    if(this.keyboard.isKeyDown(0x28))
    {
        this.moveCenter(0.0, -0.1);
    }
};
Application.prototype.processMouseInput = function(deltaMilliseconds)
{
    this.mouse.update(deltaMilliseconds);
    if(this.mouse.isButtonDown(0))
    {
        var deltaSeconds = deltaMilliseconds / 1000;
        this.targetCenterX -= this.mouse.velocityX * deltaSeconds;
        this.targetCenterY -= this.mouse.velocityY * deltaSeconds;
    }

    var lerpAmount = deltaMilliseconds / this.lerpAmount;
    this.centerX = this.linearInterpolate(this.centerX, this.targetCenterX, lerpAmount);
    this.centerY = this.linearInterpolate(this.centerY, this.targetCenterY, lerpAmount);

    this.zoom = this.linearInterpolate(this.zoom, this.targetZoom, lerpAmount);
};

Application.prototype.moveCenter = function(dx, dy)
{
    this.targetCenterX += dx / this.zoom;
    this.targetCenterY += dy / this.zoom;
};

Application.prototype.render = function()
{
    this.graphics.beginScene();
    this.scene.render(this.graphics.gl, this.graphics.shaderManager);
};

Application.prototype.moveMouse = function(dx, dy)
{
    this.mouse.move(dx / (1.0 + this.zoom), dy / (1.0 + this.zoom));
};

Application.prototype.setZoom = function(value, positionX, positionY)
{
    var zoomValue = 1.0 + value * 0.001;

    this.width /= zoomValue;
    this.height /= zoomValue;

    if(value > 0.0)
    {
        positionX = 2.0 * positionX / this.canvas.width - 1.0;
        positionY = 2.0 * (this.canvas.height - positionY) / this.canvas.height - 1.0;

        this.targetCenterX += positionX * (this.width / 2.0);
        this.targetCenterY += positionY * (this.height / 2.0);
    }

    this.targetZoom = 2.0 / this.width;
};

Application.prototype.setMode = function(value)
{
    this.scene.setMode(value);
};

Application.prototype.linearInterpolate = function(current, target, deltaTime)
{
    return (1.0 - deltaTime) * current + deltaTime * target;
};

Application.prototype.getKeyboard = function()
{
    return this.keyboard;
};
Application.prototype.getMouse = function()
{
    return this.mouse;
};
Application.prototype.resizeCanvas = function(width, height)
{
    this.canvas.width = width;
    this.canvas.height = height;
    this.aspectRatio = width / height;
    //this.scene.setAspectRatio(this.aspectRatio);
    //this.scene.setOrthogonalMode(this.aspectRatio);
};