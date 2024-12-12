uniform float uTime;
uniform vec2 uResolution;
uniform float uSize;
uniform float uSpeed;
uniform float uAmplitude;

attribute float aScale;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime * uSpeed + modelPosition.x * 100.0) * aScale * uAmplitude;
    modelPosition.x += sin(uTime * uSpeed + modelPosition.z * 100.0) * aScale * uAmplitude;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * aScale * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);
}