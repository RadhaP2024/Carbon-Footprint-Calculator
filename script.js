const result = document.querySelector('.result');
const form = document.querySelector('form');
const newButton = document.querySelector('#btn');
const answerBox = document.querySelector('.answer-box');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let { bill, vehicle, mileage, distance, ac } = e.target;
    let gas = e.target.gas;

    let answer = calculateFootPrint(
        bill.value,
        vehicle.value,
        mileage.value,
        distance.value,
        ac.value,
        gas ? gas.value : 0
    );

    // Clear form
    bill.value = '';
    vehicle.value = '';
    mileage.value = '';
    distance.value = '';
    ac.value = '';
    if (gas) {
        gas.value = '';
    }

    answerBox.style.display = 'flex';
    form.style.display = 'none';

    result.innerHTML = `Your carbon emission is: <b>${answer.toFixed(2)} kg CO₂</b>`;
});

newButton.addEventListener('click', () => {
    location.reload();
});

function calculateFootPrint(bill, vehicle, mileage, distance, ac, gas) {

    // Convert inputs to numbers
    bill = Number(bill);
    mileage = Number(mileage);
    distance = Number(distance);
    ac = Number(ac);
    gas = Number(gas);

    let emission = 0;

    // Vehicle emission factor
    let emissions_factor = 0;

    if (vehicle === 'petrol') {
        emissions_factor = 2.31;
    }
    else if (vehicle === 'diesel') {
        emissions_factor = 2.68;
    }
    else {
        emissions_factor = 0;
    }

    // Vehicle emissions
    if (mileage > 0) {
        emission += (distance / mileage) * emissions_factor;
    }

    // Electricity emissions
    const electricityFactor = 0.93;
    emission += bill * electricityFactor;

    // Air Conditioner emissions
    // Approximate: 0.5 kg CO₂ per hour
    const acFactor = 0.5;
    emission += ac * acFactor;

    // LPG emissions
    // User enters grams, convert to kilograms
    const lpgFactor = 2.983;
    emission += (gas / 1000) * lpgFactor;

    return emission;
}