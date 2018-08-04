const vertices = [],
    colors = [],
    size = 100,			// W/H of the outer box of the grid, from origin we can only go 1 unit in each direction, so from left to right is 2 units max
    div = 20.0,			// How to divide up the grid
    step = size / div,	// Steps between each line, just a number we increment by for each line in the grid.
    half = size / 2;	// From origin the starting position is half the size.

let p;	//Temp variable for position value.
for(let i=0; i <= div; i++){
    //Vertical line
    p = -half + (i * step);
    vertices.push(p);		//x1
    vertices.push(0);		//y1 vertices.push(half);
    vertices.push(half);	//z1 vertices.push(0);
    colors.push(0.8, 0.8, 0.8);

    vertices.push(p);		//x2
    vertices.push(0);		//y2 vertices.push(-half);
    vertices.push(-half);	//z2 vertices.push(0);	
    colors.push(0.8, 0.8, 0.8);

    //Horizontal line
    p = half - (i * step);
    vertices.push(-half);	//x1
    vertices.push(0);		//y1 vertices.push(p);
    vertices.push(p);		//z1 vertices.push(0);
    colors.push(0.8, 0.8, 0.8);

    vertices.push(half);	//x2
    vertices.push(0);		//y2 vertices.push(p);
    vertices.push(p);		//z2 vertices.push(0);
    colors.push(0.8, 0.8, 0.8);
}
// x轴，红色
vertices.push(-half * 2);
vertices.push(0.01);
vertices.push(0);
colors.push(1.0, 0.0, 0.0);

vertices.push(half * 2);
vertices.push(0.01);
vertices.push(0);
colors.push(1.0, 0.0, 0.0);

// y轴，绿色
vertices.push(0);
vertices.push(-half * 2);
vertices.push(0);
colors.push(0.0, 1.0, 0.0);

vertices.push(0);
vertices.push(half * 2);
vertices.push(0);
colors.push(0.0, 1.0, 0.0);

// z轴，蓝色
vertices.push(0);
vertices.push(0.01);
vertices.push(-half * 2);
colors.push(0.0, 0.0, 1.0);

vertices.push(0);
vertices.push(0.01);
vertices.push(half * 2);
colors.push(0.0, 0.0, 1.0);


export { vertices, colors };