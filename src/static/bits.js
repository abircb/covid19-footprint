/**
 * Fact-checks / Myth busters about the coronavirus (COVID-19)
 */

let info = {
  bits: [
    'COVID-19 Footprint is an Open Source project, created with ❤️. Contribute on GitHub by clicking on the icon below.',
    'Fact-check: Thermal scanners are not a conclusive test for the novel coronavirus; they cannot detect people who are infected, but are not yet sick with a fever.',
    'Fact-check: Spraying alcohol or chlorine all over your body will not kill viruses that have already entered your body. In fact, they can be harmful to clothes or mucous membranes (i.e. eyes, mouth).',
    'Fact-check: At present, there is no evidence that companion animals/pets, such as dogs or cats, can be infected with the novel coronavirus.',
    'Fact-check: People should NOT wear masks when exercising as masks may reduce the ability to breathe comfortably.',
    'Fact-check: The prolonged use of medical masks can be uncomfortable. However, it does not lead to CO2 intoxication nor oxygen deficiency.',
    'Fact-check: There is no evidence that regularly rinsing your nose with saline will protect you from the novel coronavirus.',
    'Fact-check: Garlic, indeed, does have some antimicrobial/antiviral properties. However, no evidence suggests that eating garlic has protected people from the novel coronavirus.',
    'Fact-check: Sesame oil does not kill the new coronavirus. There are some chemical disinfectants (like 75% Ethanol and Peracetic acid) that can kill the 2019-nCoV on surfaces.',
    'Fact-check: Antibiotics do not work on viruses (only bacteria) and hence, should not be used as a means of prevention against or treatment for the novel coronavirus.',
    'Fact-check: UV lamps should not be used to sterilise hands or other areas of skin as UV radiation can cause skin irritation.',
    'Fact-check: Exposing yourself to the sun or to temperatures higher than 25° Celsius does not protect you from the novel coronavirus disease.',
    'Fact-check: You can recover from the novel coronavirus disease. Catching the new coronavirus does not mean you will have it for life.',
    'Fact-check: Being able to hold your breath for 10 seconds or more without coughing or feeling discomfort DOES NOT mean you are free from the novel coronavirus disease — or any other lung disease, for that matter.',
    'Fact-check: 5G mobile networks DO NOT spread the novel coronavirus. Viruses cannot travel using radio waves/mobile networks.',
    'Fact-check: Vaccines against pneumonia do not provide protection against the novel coronavirus. The virus is so new and different that it needs its own vaccine.',
    'Fact-check: While several drug trials are ongoing, there is currently no proof that hydroxychloroquine (or any other drug) can cure or prevent COVID-19. The misuse of hydroxychloroquine can cause serious side effects and illness.',
    'Fact-check: Spraying and introducing bleach or another disinfectant into your body WILL NOT protect you against COVID-19 and can be dangerous.',
    'Fact-check: Drinking methanol, ethanol or bleach DOES NOT prevent or cure COVID-19 and can be extremely dangerous.',
  ],
}

/**
 * @returns {String} A random info bit
 */
function getInfoBit() {
  let bits = info.bits
  let min = 0,
    max = bits.length - 1
  let index = Math.floor(Math.random() * (+max - +min)) + +min
  return bits[index]
}

export { getInfoBit }
