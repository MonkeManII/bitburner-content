const HACK_MIN_PERCENT = 80.0;

/** @param {NS} ns */
export async function h_loop(ns) {
  let hostlist = null;

  while (hostlist === null) {
    try {
      await ns.wget("https://raw.githubusercontent.com/MonkeManII/bitburner-content/master/data.json", "data.json"); 
      hostlist = JSON.parse(ns.read("data.json"));
    } catch {
      await ns.asleep(100);
    }
  }

  while (true) {
    let server = hostlist[
      Math.ceil(
        Math.random() * hostlist.length
      ) - 1
    ];

    if (ns.getServerMoneyAvailable(server) / ns.getServerMaxMoney(server) >= HACK_MIN_PERCENT / 100) {
      console.log(`Server ${server} has money over ${HACK_MIN_PERCENT}%! Attempting weaken & hack...`);
      await ns.weaken(server);
      await ns.hack(server);
    } else {
      console.log(`Server ${server} has money under ${HACK_MIN_PERCENT}%! Attempting money spoof...`);
      await ns.grow(server);
    }
  }
}
