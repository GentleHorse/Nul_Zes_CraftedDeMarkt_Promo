uniform vec3 uColor;

void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float strength = 0.1 / distanceToCenter - 0.1 * 2.0;

    gl_FragColor = vec4(uColor, strength);
}