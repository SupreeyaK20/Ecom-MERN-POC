const shippingZones = require("./shippingZone");

const shippingPrice = {
    calculateShippingPrice : (shipping, items) => {
    
        // Find the shipping zone of the shipping address
        
        const shippingZone = shippingZones.find(
          (zone) => zone.name === shipping.country
        );

        if (!shippingZone) {
          throw new Error(`Invalid shipping zone: ${shipping.country}`);
        }
      
        // Calculate the total weight of the items
        const totalPrice = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      
        // Find the shipping rate for the total weight of the items
        const shippingRate = shippingZone.rates.find(
          (rate) => totalPrice <= rate.maxWeight
        );
        if (!shippingRate) {
          throw new Error(`No shipping rate found for weight: ${totalWeight}`);
        }
      
        // Return the shipping price
        return shippingRate.price;
    }
    
}

module.exports = shippingPrice