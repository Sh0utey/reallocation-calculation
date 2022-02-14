const inputs = document.querySelectorAll("input")
const currentAllocation = {}
const idealAllocation = {}
const allocationsDifferece = {}

/*-------------------------FUNCTIONS-------------------------*/

/**
 * @param {HTMLElement} input - input name
 * @returns {number} - value (in € or %)
 */
const parseFloatValue = input => parseFloat(input)


/**
 * Set assets properties of allocations Objects
 * @param {Object} allocation - allocation name
 * @param {string} asset - asset name
 * @param {HTMLElement} input - input name
 */
const setUserAllocations = (allocation, asset, input) => {
    allocation[asset] = parseFloatValue(input)
}

/**
 * 
 * @param {string} asset - asset name
 */
const convertUserAllocations = (asset) => {
  currentAllocation[asset+'InPercentages'] = (currentAllocation[asset+'InEuros'] / currentAllocation.total) * 100
  idealAllocation[asset+'InEuros'] = (idealAllocation[asset+'InPercentages'] / 100) * currentAllocation.total
}

const getUserAllocations = () => {

  const currentEurosFunds = document.getElementById("current-euros-funds-in-euros")
  const currentActions = document.getElementById("current-actions-in-euros")
  const currentRealEstate = document.getElementById("current-real-estate-in-euros")
  const currentExotic = document.getElementById("current-exotic-in-euros")
  const idealEurosFunds = document.getElementById("ideal-euros-funds-in-percentages")
  const idealActions = document.getElementById("ideal-actions-in-percentages")
  const idealRealEstate = document.getElementById("ideal-real-estate-in-percentages")
  const idealExotic = document.getElementById("ideal-exotic-in-percentages")
  const allowedFluctuation = document.getElementById('allowed-fluctuation')

  const allocations = [currentAllocation, idealAllocation]
  const assets = ['eurosFunds', 'actions', 'realEstate','exotic']

  const assetsValues = {
    currenteurosFunds: currentEurosFunds.value,
    currentactions: currentActions.value,
    currentrealEstate: currentRealEstate.value,
    currentexotic: currentExotic.value,
    idealeurosFunds: idealEurosFunds.value,
    idealactions: idealActions.value,
    idealrealEstate: idealRealEstate.value,
    idealexotic: idealExotic.value
  }


  for (const allocation of allocations) {
    for (const asset of assets) {
        if (allocation === currentAllocation) {
        setUserAllocations(allocation, asset+'InEuros', assetsValues['current'+asset])
      } else {
        setUserAllocations(allocation,asset+'InPercentages', assetsValues['ideal'+asset])
        setUserAllocations(allocation, 'allowedFluctuation', allowedFluctuation.value)
      }
    } 
  }

  currentAllocation.total = 
  currentAllocation.eurosFundsInEuros + currentAllocation.actionsInEuros + currentAllocation.realEstateInEuros + currentAllocation.exoticInEuros

  for(const asset of assets) {
    convertUserAllocations(asset)
  }
}

/*-------------------------EVENT LISTENERS-------------------------*/

 for(const input of inputs) {
  input.value = '0'
  input.addEventListener("input", () => {
    getUserAllocations()
    console.log('currentAllocation', currentAllocation)
    console.log('idealAllocation',idealAllocation)
  })
}