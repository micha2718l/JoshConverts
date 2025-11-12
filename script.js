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

// Fun response templates for Josh & Chuck personality
const funResponses = {
    greetings: [
        "Well, well, well! Let's see what we've got here...",
        "Alright Chuck, check this out!",
        "Oh boy, this is a good one!",
        "Fascinating question! Let me crunch these numbers...",
        "You know what? I love this kind of stuff!",
        "Hold on to your hats, folks!",
        "This is the kind of question that keeps me up at night!",
    ],
    large: [
        "Holy smokes, that's MASSIVE!",
        "Whoa! That's a LOT!",
        "Now we're talking BIG numbers!",
        "That's impressively huge!",
    ],
    small: [
        "Okay, so we're going small scale here!",
        "Alright, let's think tiny for a second...",
        "Breaking it down to the little guys!",
    ],
    equal: [
        "Here's the scoop:",
        "Check this out:",
        "Get ready for this:",
        "Drumroll please...",
    ]
};

function getRandomResponse(category) {
    const responses = funResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Enhanced natural language parsing - custom lightweight implementation
function parseInputNLP(input) {
    // Remove commas and normalize
    input = input.trim().replace(/,/g, '');
    const lowerInput = input.toLowerCase();
    
    // Extract all numbers from the input
    const numberMatches = input.match(/[\d.]+/g);
    const numbers = numberMatches ? numberMatches.map(n => parseFloat(n)) : [];
    
    // Pattern 1: "how many X equal(s) Y?" or "X equals Y"
    const equalMatch = lowerInput.match(/how\s+many\s+(.+?)\s+(?:equal|equals?|are\s+in|is\s+in|in)\s+(?:a\s+|an\s+)?(.+?)(?:\?|$)/i);
    if (equalMatch) {
        const targetItem = equalMatch[1].trim();
        const sourceInput = equalMatch[2].trim();
        
        // Try to extract quantity from source
        const sourceMatch = sourceInput.match(/^([\d.]+)\s+(.+)$/);
        if (sourceMatch) {
            return {
                quantity: parseFloat(sourceMatch[1]),
                item: sourceMatch[2].toLowerCase(),
                targetItem: targetItem.toLowerCase(),
                mode: 'reverse'
            };
        } else {
            // Assume quantity is 1
            return {
                quantity: 1,
                item: sourceInput.toLowerCase(),
                targetItem: targetItem.toLowerCase(),
                mode: 'reverse'
            };
        }
    }
    
    // Pattern 2: "convert X" or "what is X"
    const convertMatch = lowerInput.match(/(?:convert|what\s+is|what's|whats)\s+(.+?)(?:\?|$)/i);
    if (convertMatch) {
        const itemInput = convertMatch[1].trim();
        const match = itemInput.match(/^([\d.]+)\s+(.+)$/);
        if (match) {
            return {
                quantity: parseFloat(match[1]),
                item: match[2].toLowerCase(),
                mode: 'normal'
            };
        }
    }
    
    // Pattern 3: "X to Y" or "X into Y"
    const toMatch = lowerInput.match(/(.+?)\s+(?:to|into)\s+(.+?)(?:\?|$)/i);
    if (toMatch) {
        const sourceInput = toMatch[1].trim();
        const targetItem = toMatch[2].trim();
        
        const sourceMatch = sourceInput.match(/^([\d.]+)\s+(.+)$/);
        if (sourceMatch) {
            return {
                quantity: parseFloat(sourceMatch[1]),
                item: sourceMatch[2].toLowerCase(),
                targetItem: targetItem.toLowerCase(),
                mode: 'specific'
            };
        }
    }
    
    // Pattern 4: Simple "number + item" (fallback to original behavior)
    const simpleMatch = input.match(/^([\d.]+)\s+(.+)$/i);
    if (simpleMatch) {
        const quantity = parseFloat(simpleMatch[1]);
        const item = simpleMatch[2].toLowerCase().trim();
        
        if (!isNaN(quantity) && quantity > 0) {
            return { quantity, item, mode: 'normal' };
        }
    }
    
    // Pattern 5: Just an item name (assume quantity of 1)
    const potentialItem = lowerInput.replace(/\?/g, '').trim();
    if (referenceData[potentialItem]) {
        return { quantity: 1, item: potentialItem, mode: 'normal' };
    }
    
    // Pattern 6: Try to find any known item in the input
    for (const knownItem in referenceData) {
        if (lowerInput.includes(knownItem)) {
            // Found an item, try to extract quantity
            if (numbers.length > 0) {
                return { quantity: numbers[0], item: knownItem, mode: 'normal' };
            } else {
                return { quantity: 1, item: knownItem, mode: 'normal' };
            }
        }
    }
    
    return null;
}

// Legacy function for backwards compatibility
function parseInput(input) {
    return parseInputNLP(input);
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

function calculateConversions(quantity, item, mode = 'normal', targetItem = null) {
    const inputData = referenceData[item];
    
    if (!inputData) {
        return null;
    }
    
    const totalWeight = quantity * inputData.weight;
    const conversions = [];
    
    // Mode: specific - user wants to convert to a specific item
    if (mode === 'specific' && targetItem && referenceData[targetItem]) {
        const targetData = referenceData[targetItem];
        const convertedQty = totalWeight / targetData.weight;
        
        return [{
            quantity: formatNumber(convertedQty),
            label: targetData.plural,
            rawQty: convertedQty,
            mode: 'specific'
        }];
    }
    
    // Mode: reverse - user wants to know how many X equal Y
    if (mode === 'reverse' && targetItem && referenceData[targetItem]) {
        const targetData = referenceData[targetItem];
        const convertedQty = totalWeight / targetData.weight;
        
        return [{
            quantity: formatNumber(convertedQty),
            label: targetData.plural,
            rawQty: convertedQty,
            mode: 'reverse'
        }];
    }
    
    // Mode: normal - show multiple conversions
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

function displayResults(conversions, inputData = {}) {
    const resultDiv = document.getElementById('results');
    const conversionList = document.getElementById('conversionList');
    const errorDiv = document.getElementById('error');
    
    // Clear previous results
    conversionList.innerHTML = '';
    errorDiv.classList.add('hidden');
    
    if (!conversions || conversions.length === 0) {
        errorDiv.innerHTML = `<strong>Hmm, that's a head-scratcher!</strong><br>We don't have data for that item yet. Try something like "how many cats equal a blue whale?" or "convert 50 pickup trucks"!`;
        errorDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }
    
    // Add fun greeting based on conversion size
    const greeting = document.createElement('p');
    greeting.className = 'fun-greeting';
    greeting.style.cssText = 'color: #764ba2; font-style: italic; margin-bottom: 15px; font-size: 1.1em;';
    
    const maxQty = Math.max(...conversions.map(c => c.rawQty || 0));
    if (maxQty > 1000000) {
        greeting.textContent = getRandomResponse('large');
    } else if (maxQty < 1) {
        greeting.textContent = getRandomResponse('small');
    } else {
        greeting.textContent = getRandomResponse('greetings');
    }
    
    conversionList.appendChild(greeting);
    
    // Add result header
    const header = document.createElement('p');
    header.style.cssText = 'font-weight: bold; margin-bottom: 10px; color: #667eea;';
    
    if (inputData.mode === 'reverse') {
        header.textContent = `${getRandomResponse('equal')} That equals about...`;
    } else if (inputData.mode === 'specific') {
        header.textContent = `${getRandomResponse('equal')} That's approximately...`;
    } else {
        header.textContent = `${getRandomResponse('equal')} That's roughly...`;
    }
    
    conversionList.appendChild(header);
    
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
    const parsed = parseInputNLP(input);
    
    if (!parsed) {
        const errorDiv = document.getElementById('error');
        errorDiv.innerHTML = `<strong>Oops!</strong> I didn't quite catch that. Try asking something like:<br>
            • "How many cats equal a blue whale?"<br>
            • "Convert 100 apples"<br>
            • "5 elephants to cars"<br>
            • "1000 big macs"`;
        errorDiv.classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
        return;
    }
    
    const conversions = calculateConversions(
        parsed.quantity, 
        parsed.item, 
        parsed.mode || 'normal', 
        parsed.targetItem
    );
    
    displayResults(conversions, parsed);
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
