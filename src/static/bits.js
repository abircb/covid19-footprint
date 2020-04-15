/**
 * Fact-checks / Myth busters about the Coronavirus (COVID-19)
 */

let info = {
    bits: [
      'Fact-check: Thermal scanners are not a conclusive test for the novel Coronavirus - they cannot detect people who are infected, but are not yet sick with fever.',
      'Fact-check: No, spraying alcohol or chlorine all over your body will not kill viruses that have already entered your body. In fact, they can be harmful to clothes or mucous membranes (i.e. eyes, mouth).',
      'Fact-check: At present, there is no evidence that companion animals/pets, such as dogs or cats, can be infected with the novel Coronavirus.',
      'Fact-check: No, there is no evidence that regularly rinsing your nose with saline will protect you from the novel Coronavirus.',
      'Fact-check: Garlic, indeed, does have some antimicrobial/antivirall properties. However, there is no evidence that suggests that eating garlic has protected people from the novel Coronavirus.',
      'Fact-check: No, sesame oil does not kill the new Coronavirus. There are some chemical disinfectants (like 75% Ethanol and Peracetic acid) that can kill the 2019-nCoV on surfaces.',
      'Fact-check: No, antibiotics do not work on viruses (only bacteria) and hence, should not be used as a means of prevention against or treatment for the novel Coronavirus.',
      'Fact-check: No, hand dryers are not effective in killing the 2019-nCoV. To protect yourself against the virus, you should frequently clean your hands with an alcohol-based sanitiser or wash them with soap and water.',
      'Fact-check: UV lamps should not be used to sterilise hands or other areas of skin as UV radiation can cause skin irritation.',
      'Fact-check: No, exposing yourself to the sun or to temperatures higher than 25° Celsius does not prevent the novel Coronavirus disease.',
      'Fact-check: You can recover from the novel Coronavirus disease. Catching the new coronavirus does not mean you will have it for life.',
      'Fact-check: Being able to hold your breath for 10 seconds or more without coughing or feeling discomfort DOES NOT mean you are free from the novel Coronavirus disease or any other lung disease, for that matter.',
      'Fact-check: Drinking alcohol does not protect you against COVID-19. Frequent or excessive alcohol consumption, in fact, can increase your risk of health problems.',
      'Fact-check: Cold weather and snow CANNOT kill the new Coronavirus.',
      'Fact-check: The new Coronavirus CANNOT be transmitted through mosquito bites.',
      'Fact-check: 5G mobile networks DO NOT spread the novel Coronavirus. Viruses cannot travel using radio waves/mobile networks.',
      'Fact-check: No, vaccines against pneumonia do not provide protection against the novel Coronavirus. The virus is so new and different that it needs its own vaccine.',
      'COVID-19 Footprint is an Open Source project, created with ❤️. Contribute on GitHub by clicking on the icon below.',
    ],
  }
  
/**
 * @returns {String} A random info bit
 */
function getInfoBit() {
    let bits = info.bits
    let min = 0, max = bits.length - 1;
    let index = Math.floor(Math.random() * (+max - +min)) + +min;
    return bits[index]
  }

  export { getInfoBit }
  