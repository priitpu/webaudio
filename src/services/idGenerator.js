function* oscillatorIdGenerator() {
  let i = 0;
  while(i < i + 1) {
    yield `oscillator-${i++}`;
  }
}

export const oscillatorId = oscillatorIdGenerator(1);
