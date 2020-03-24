const collides = (r1, r2) => {
  if (r2.x < r1.x + r1.w && r1.x < r2.x + r2.w && r2.y < r1.y + r1.h)
    return r1.y < r2.y + r2.h;
  else return false;
};

export { collides };
