// Conversion data - all weights in kilograms, all volumes in liters
const referenceData = {
    // Common items
    'pickup truck': { weight: 2268, type: 'weight', plural: 'pickup trucks' },
    'pickup trucks': { weight: 2268, type: 'weight', plural: 'pickup trucks' },
    'elephant': { weight: 6000, type: 'weight', plural: 'elephants' },
    'elephants': { weight: 6000, type: 'weight', plural: 'elephants' },
    'blue whale': { weight: 150000, type: 'weight', plural: 'blue whales' },
    'blue whales': { weight: 150000, type: 'weight', plural: 'blue whales' },
    'car': { weight: 1500, type: 'weight', plural: 'cars' },
    'cars': { weight: 1500, type: 'weight', plural: 'cars' },
    'school bus': { weight: 11340, type: 'weight', plural: 'school buses' },
    'school buses': { weight: 11340, type: 'weight', plural: 'school buses' },
    
    // Food items
    'big mac': { weight: 0.215, type: 'weight', plural: 'Big Macs' },
    'big macs': { weight: 0.215, type: 'weight', plural: 'Big Macs' },
    'apple': { weight: 0.182, type: 'weight', plural: 'apples' },
    'apples': { weight: 0.182, type: 'weight', plural: 'apples' },
    'banana': { weight: 0.118, type: 'weight', plural: 'bananas' },
    'bananas': { weight: 0.118, type: 'weight', plural: 'bananas' },
    'potato': { weight: 0.213, type: 'weight', plural: 'potatoes' },
    'potatoes': { weight: 0.213, type: 'weight', plural: 'potatoes' },
    'watermelon': { weight: 9.07, type: 'weight', plural: 'watermelons' },
    'watermelons': { weight: 9.07, type: 'weight', plural: 'watermelons' },
    'bowling ball': { weight: 6.8, type: 'weight', plural: 'bowling balls' },
    'bowling balls': { weight: 6.8, type: 'weight', plural: 'bowling balls' },
    
    // Animals
    'cat': { weight: 4.5, type: 'weight', plural: 'cats' },
    'cats': { weight: 4.5, type: 'weight', plural: 'cats' },
    'dog': { weight: 25, type: 'weight', plural: 'dogs' },
    'dogs': { weight: 25, type: 'weight', plural: 'dogs' },
    'horse': { weight: 500, type: 'weight', plural: 'horses' },
    'horses': { weight: 500, type: 'weight', plural: 'horses' },
    'giraffe': { weight: 1200, type: 'weight', plural: 'giraffes' },
    'giraffes': { weight: 1200, type: 'weight', plural: 'giraffes' },
    
    // Fun/quirky items
    'grand piano': { weight: 480, type: 'weight', plural: 'grand pianos' },
    'grand pianos': { weight: 480, type: 'weight', plural: 'grand pianos' },
    'statue of liberty': { weight: 225000, type: 'weight', plural: 'Statues of Liberty' },
    'statues of liberty': { weight: 225000, type: 'weight', plural: 'Statues of Liberty' },
    'eiffel tower': { weight: 10100000, type: 'weight', plural: 'Eiffel Towers' },
    'eiffel towers': { weight: 10100000, type: 'weight', plural: 'Eiffel Towers' },
};

// Fun facts for various items
const funFacts = {
    'big mac': "The Big Mac was created in 1967 by Jim Delligatti, a McDonald's franchisee in Pennsylvania!",
    'elephant': "An elephant's trunk contains over 40,000 muscles and can hold up to 8 liters of water!",
    'blue whale': "Blue whales are the largest animals to have ever existed on Earth - even bigger than dinosaurs!",
    'pickup truck': "The Ford F-Series has been America's best-selling vehicle for over 40 years!",
    'apple': "There are over 7,500 varieties of apples grown worldwide!",
    'statue of liberty': "The Statue of Liberty's official name is 'Liberty Enlightening the World'!",
    'eiffel tower': "The Eiffel Tower was originally intended to be a temporary structure for the 1889 World's Fair!",
    'bowling ball': "The first rubber bowling ball was introduced in 1905 - before that, they were made of wood!",
    'school bus': "School buses are yellow because that color is easier to see in peripheral vision than any other color!",
    'giraffe': "Despite their long necks, giraffes have the same number of vertebrae as humans - just seven!",
};

// Get default fun fact
const defaultFacts = [
    "Josh and Chuck have been hosting Stuff You Should Know since 2008!",
    "SYSK has covered over 1,600 topics and counting!",
    "The average human body contains enough carbon to make 900 pencils!",
    "A cloud can weigh more than a million pounds!",
    "Honey never spoils - archaeologists have found 3,000-year-old honey that's still edible!",
];

function parseInput(input) {
    // Remove commas and normalize spacing
    input = input.trim().replace(/,/g, '');
    
    // Try to match pattern: number + item
    const match = input.match(/^([\d.]+)\s+(.+)$/i);
    
    if (!match) {
        return null;
    }
    
    const quantity = parseFloat(match[1]);
    const item = match[2].toLowerCase().trim();
    
    if (isNaN(quantity) || quantity <= 0) {
        return null;
    }
    
    return { quantity, item };
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + ' billion';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + ' million';
    } else if (num >= 1000) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    } else if (num >= 10) {
        return num.toFixed(1);
    } else {
        return num.toFixed(2);
    }
}

function calculateConversions(quantity, item) {
    const inputData = referenceData[item];
    
    if (!inputData) {
        return null;
    }
    
    const totalWeight = quantity * inputData.weight;
    const conversions = [];
    
    // Select interesting comparison items
    const comparisonItems = [
        'big mac',
        'apple',
        'banana',
        'elephant',
        'car',
        'school bus',
        'bowling ball',
        'grand piano',
        'cat',
        'horse',
    ];
    
    // Add some fun ones for large quantities
    if (totalWeight > 100000) {
        comparisonItems.push('blue whale', 'statue of liberty');
    }
    
    if (totalWeight > 1000000) {
        comparisonItems.push('eiffel tower');
    }
    
    // Calculate conversions
    comparisonItems.forEach(compItem => {
        if (compItem !== item && referenceData[compItem]) {
            const compData = referenceData[compItem];
            const convertedQty = totalWeight / compData.weight;
            
            // Only show if it's a reasonable number (not too small)
            if (convertedQty >= 0.1) {
                conversions.push({
                    quantity: formatNumber(convertedQty),
                    label: compData.plural,
                    rawQty: convertedQty
                });
            }
        }
    });
    
    // Sort by raw quantity (smallest to largest)
    conversions.sort((a, b) => a.rawQty - b.rawQty);
    
    // Take top 8 most interesting
    return conversions.slice(0, 8);
}

function displayResults(conversions) {
    const resultDiv = document.getElementById('results');
    const conversionList = document.getElementById('conversionList');
    const errorDiv = document.getElementById('error');
    
    // Clear previous results
    conversionList.innerHTML = '';
    errorDiv.classList.add('hidden');
    
    if (!conversions || conversions.length === 0) {
        errorDiv.textContent = 'Sorry, we don\'t have conversion data for that item yet! Try something like "1000 elephants" or "50 pickup trucks".';
        errorDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }
    
    conversions.forEach(conv => {
        const item = document.createElement('div');
        item.className = 'conversion-item';
        item.innerHTML = `
            <span class="quantity">${conv.quantity}</span>
            <span class="label">${conv.label}</span>
        `;
        conversionList.appendChild(item);
    });
    
    resultDiv.classList.remove('hidden');
}

function updateFunFact(item) {
    const funFactElement = document.getElementById('funFact');
    
    if (funFacts[item]) {
        funFactElement.textContent = funFacts[item];
    } else {
        // Random default fact
        const randomFact = defaultFacts[Math.floor(Math.random() * defaultFacts.length)];
        funFactElement.textContent = randomFact;
    }
}

function handleConversion() {
    const input = document.getElementById('userInput').value;
    const parsed = parseInput(input);
    
    if (!parsed) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = 'Please enter a valid quantity and item (e.g., "100 apples" or "5 elephants")';
        errorDiv.classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
        return;
    }
    
    const conversions = calculateConversions(parsed.quantity, parsed.item);
    displayResults(conversions);
    updateFunFact(parsed.item);
}

// Event listeners
document.getElementById('convertBtn').addEventListener('click', handleConversion);

document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleConversion();
    }
});

// Show a random fun fact on load
document.addEventListener('DOMContentLoaded', () => {
    const funFactElement = document.getElementById('funFact');
    const randomFact = defaultFacts[Math.floor(Math.random() * defaultFacts.length)];
    funFactElement.textContent = randomFact;
});
