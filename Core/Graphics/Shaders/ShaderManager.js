function ShaderManager()
{
}

ShaderManager.prototype.initialize = function(gl)
{
    // Initialize mandelbrot shader:
    this.mandelbrotShader = new MandelbrotShader();
    this.mandelbrotShader.initialize(gl);
};

ShaderManager.prototype.setMandelbrotShader = function(gl)
{
    this.mandelbrotShader.setShader(gl);
};
ShaderManager.prototype.getMandelbrotShader = function()
{
    return this.mandelbrotShader;
};