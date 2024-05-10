# PERFORMANCE

NOTE:
- Benchmarks are done only on the Deno environment.
- Feel free to share the counter cases if you find.

## SystemInfo

Benchmarked on my Vultr virtual machine.

```sh
> npx systeminformation info
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  SYSTEMINFORMATION                                                      Version: 5.22.8 │
└─────────────────────────────────────────────────────────────────────────────────────────┘

Operating System:
──────────────────────────────────────────────────────────────────────────────────────────
Platform         : linux
Distro           : Ubuntu
Release          : 22.04.4 LTS
Codename         : jammy
Kernel           : 5.15.0-101-generic
Arch             : x64
Hostname         : luma-space
Codepage         : UTF-8
Build            :

System:
──────────────────────────────────────────────────────────────────────────────────────────
Manufacturer     : Vultr
Model            : VHP
Version          : pc-q35-8.2
Virtual          : true
VirtualHost      : QEMU

CPU:
──────────────────────────────────────────────────────────────────────────────────────────
Manufacturer     : AMD
Brand            : EPYC-Rome Processor
Family           : 23
Model            : 49
Stepping         : 0
Speed            :
Cores            : 4
PhysicalCores    : 2
PerformanceCores : 2
EfficiencyCores  :
Processors       : 1
Socket           :
```

## SIMPLE3: Just looking up sequentially from 3 entries

```sh
> deno bench ./bench/simple3.ts
cpu: AMD EPYC-Rome Processor
runtime: deno 1.43.3 (x86_64-unknown-linux-gnu)

benchmark       time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------- -----------------------------
Map             22.59 ms/iter          44.3   (17.63 ms … 35.18 ms) 24.84 ms 35.18 ms 35.18 ms
{obj}            4.02 ms/iter         248.5     (2.39 ms … 5.36 ms) 4.57 ms 4.84 ms 5.36 ms
switch(){}     799.37 µs/iter       1,251.0   (421.14 µs … 1.33 ms) 952.56 µs 1.08 ms 1.2 ms
ConstMap       617.99 µs/iter       1,618.1   (414.14 µs … 1.45 ms) 700.62 µs 1.03 ms 1.13 ms

summary
  ConstMap
   1.29x faster than switch(){}
   6.51x faster than {obj}
   36.56x faster than Map
```

NOTE: Sometimes `{obj}` is fast as `switch(){}`. It could depend on the real-time optimization of the JS engine.

## RANDOM3: Looking up randomly from 3 entries

```sh
> deno bench ./bench/random3.ts
cpu: AMD EPYC-Rome Processor
runtime: deno 1.43.3 (x86_64-unknown-linux-gnu)

benchmark       time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------- -----------------------------
Map             19.16 ms/iter          52.2   (18.04 ms … 20.25 ms) 19.44 ms 20.25 ms 20.25 ms
{obj}           19.76 ms/iter          50.6   (16.64 ms … 24.43 ms) 20.64 ms 24.43 ms 24.43 ms
switch(){}       7.51 ms/iter         133.1     (6.28 ms … 9.42 ms) 7.91 ms 9.42 ms 9.42 ms
ConstMap         6.19 ms/iter         161.6     (5.28 ms … 7.42 ms) 6.43 ms 7.42 ms 7.42 ms

summary
  ConstMap
   1.21x faster than switch(){}
   3.1x faster than Map
   3.19x faster than {obj}
```

## RANDOM26: Looking up randomly from 24 object entries

```sh
> deno bench ./bench/random24.ts
cpu: AMD EPYC-Rome Processor
runtime: deno 1.43.3 (x86_64-unknown-linux-gnu)

benchmark       time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------- -----------------------------
Map             21.66 ms/iter          46.2   (16.72 ms … 26.34 ms) 23.96 ms 26.34 ms 26.34 ms
{obj}           28.83 ms/iter          34.7    (23.7 ms … 39.91 ms) 30.84 ms 39.91 ms 39.91 ms
switch(){}      26.28 ms/iter          38.1   (20.75 ms … 33.96 ms) 30.01 ms 33.96 ms 33.96 ms
ConstMap        12.13 ms/iter          82.4    (9.53 ms … 16.34 ms) 14.47 ms 16.34 ms 16.34 ms

summary
  ConstMap
   1.78x faster than Map
   2.17x faster than switch(){}
   2.38x faster than {obj}
```
