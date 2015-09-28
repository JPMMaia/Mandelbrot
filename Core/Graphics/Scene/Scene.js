function Scene()
{
}

Scene.prototype.initialize = function(gl, shaderManager)
{
    // Set clear color:
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Create the main camera:
    this.currentCamera = new CameraComponent();
    this.currentCamera.initialize();

    this.initializeObjects(gl, shaderManager);
};

Scene.prototype.shutdown = function(gl)
{
    this.shutdownObjects(gl);
};

Scene.prototype.render = function(gl, shaderManager)
{
    var mandelbrotShader = shaderManager.getMandelbrotShader();
    mandelbrotShader.setShader(gl);

    // Set projection matrix:
    mandelbrotShader.setProjectionMatrix(gl, flatten(this.currentCamera.getProjectionMatrix()));

    // Set view matrix:
    mandelbrotShader.setViewMatrix(gl, flatten(this.currentCamera.getViewMatrix()));

    // Set model matrix:
    mandelbrotShader.setModelMatrix(gl, this.squareModelMatrix);

    mandelbrotShader.setCenter(gl, this.centerX, this.centerY);
    mandelbrotShader.setZoom(gl, this.zoom);

    // Set color palette texture:
    mandelbrotShader.setColorPaletteTexture(gl, this.colorPaletteTexture);

    this.squareModel.render(gl);
};

Scene.prototype.setOrthogonalMode = function(aspectRatio)
{
    this.currentCamera.setOrthogonal(-0.5 * aspectRatio, 0.5 * aspectRatio, -0.5, 0.5, -1.0, 1.0);
};
Scene.prototype.setPerspectiveMode = function(fieldOfViewY, aspectRatio)
{
    this.currentCamera.setPerspective(fieldOfViewY, aspectRatio, 0.1, 20.0);
};

Scene.prototype.initializeObjects = function(gl, shaderManager)
{
    // Create a square mesh:
    var squareMesh = new Square();
    squareMesh.initialize();

    // Create a square model, where we will display the mandelbrot set:
    this.squareModel = new SimpleModel();
    this.squareModel.initialize(gl, shaderManager.getMandelbrotShader(), squareMesh.vertices, squareMesh.textureCoordinates, squareMesh.indices);

    this.squareModelMatrix = flatten(
        mat4(
            1.75, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
    );

    // Create a color palette texture:
    var colorPaletteImage = PaletteTexture.generateImage();
    this.colorPaletteTexture = new Texture();
    this.colorPaletteTexture.initialize(gl, colorPaletteImage, gl.RGBA, colorPaletteImage.length / 4, 1);

    this.centerX = 0;
    this.centerY = 0;
    this.zoom = 0;
};
Scene.prototype.shutdownObjects = function(gl)
{
    this.squareModel.shutdown(gl);
};

Scene.prototype.setCenter = function (x, y)
{
    this.centerX = x;
    this.centerY = y;
};

Scene.prototype.setZoom = function(value)
{
    this.zoom = value;
};