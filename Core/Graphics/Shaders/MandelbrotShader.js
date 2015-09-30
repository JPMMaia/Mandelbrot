function MandelbrotShader()
{
    this.super = new AbstractShader();
}

MandelbrotShader.prototype.initialize = function(gl)
{
    this.super.initialize(gl, "MandelbrotVertexShader", "MandelbrotFragmentShader");

    // Get uniforms locations:
    this.modelMatrix = gl.getUniformLocation(this.super.program, "uModelMatrix");
    this.viewMatrix = gl.getUniformLocation(this.super.program, "uViewMatrix");
    this.projectionMatrix = gl.getUniformLocation(this.super.program, "uProjectionMatrix");
    this.center = gl.getUniformLocation(this.super.program, "uCenter");
    this.zoom = gl.getUniformLocation(this.super.program, "uZoom");
    this.colorPaletteTexture = gl.getUniformLocation(this.super.program, "uColorPalette");
    this.numberOfColorsInPalette = gl.getUniformLocation(this.super.program, "uNumberOfColorsInPalette");
    this.mode = gl.getUniformLocation(this.super.program, "uMode");

    // Get attributes locations:
    this.position = gl.getAttribLocation(this.super.program, "vPosition");
    this.textureCoordinates = gl.getAttribLocation(this.super.program, "vTextureCoordinates");
};

MandelbrotShader.prototype.setShader = function(gl)
{
    this.super.setShader(gl);
};

MandelbrotShader.prototype.setModelMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.modelMatrix, false, value);
};

MandelbrotShader.prototype.setViewMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.viewMatrix, false, value);
};

MandelbrotShader.prototype.setProjectionMatrix = function(gl, value)
{
    gl.uniformMatrix4fv(this.projectionMatrix, false, value);
};

MandelbrotShader.prototype.setCenter = function(gl, x, y)
{
    gl.uniform2f(this.center, x, y);
};

MandelbrotShader.prototype.setZoom = function(gl, value)
{
    gl.uniform1f(this.zoom, value);
};

MandelbrotShader.prototype.setColorPaletteTexture = function(gl, texture)
{
    texture.bind(gl, this.colorPaletteTexture, 0);
    gl.uniform1i(this.numberOfColorsInPalette, texture.width);
};

MandelbrotShader.prototype.setMode = function(gl, value)
{
    gl.uniform1i(this.mode, value);
};