from math import gcd

steps, _, *rest = open('Day8_Input_Example').read().splitlines()

network = {}
print(steps)            # Output: LR

for line in rest:
    pos, targets = line.split(" = ")
    network[pos] = targets[1:-1].split(", ")

positions = [key for key in network if key.endswith("A")]

print(network)          # Output: {'11A': ['11B', 'XXX'], '11B': ['XXX', '11Z'], '11Z': ['11B', 'XXX'], '22A': [
# '22B', 'XXX'], '22B': ['22C', '22C'], '22C': ['22Z', '22Z'], '22Z': ['22B', '22B'], 'XXX': ['XXX', 'XXX']}

print(positions)        # Output: ['11A', '22A']


cycles =[]

for current in positions:
    cycle =[]

    current_steps = steps
    step_count = 0
    first_z = None

    while True:
        while step_count == 0 or not current.endswith("Z"):
            step_count += 1
            current = network[current][0 if current_steps[0] == "L" else 1]
            current_steps = current_steps[1:] + current_steps[0]

        cycle.append(step_count)

        if first_z is None:
            first_z = current
            step_count = 0

        elif current == first_z:
            break

    cycles.append(cycle)

print(cycles)       # Output is [[2, 2], [3, 3]]

nums = [cycle[0] for cycle in cycles]

# print(nums)

lcm = nums.pop()

for num in nums:
    lcm = lcm * num // gcd(lcm, num)

# print(lcm)