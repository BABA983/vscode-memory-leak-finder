export const beforeSetup = async (module, context) => {
  if (module.beforeSetup) {
    await module.beforeSetup(context)
  }
}

export const setup = async (module, context) => {
  if (module.setup) {
    await module.setup(context)
  }
}

export const run = async (module, context) => {
  if (module.run) {
    await module.run(context)
  }
}