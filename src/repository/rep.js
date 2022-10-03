const additionInfo = drag => {
    
    if (Object.keys(drag).length !== 0) {
        const diameter = drag.diameter.meters;
        const hight = drag.height_w_trunk.meters;
        const mass = drag.dry_mass_kg;
        const loadCapacity = drag.launch_payload_mass.kg;
        const orbitDuration = drag.orbit_duration_yr;
        const firstFlight = drag.first_flight;

        const addParam = [
            { param: diameter, title: 'diametr' },
            { param: hight, title: 'hight' },
            { param: mass, title: 'mass' },
            { param: loadCapacity, title: 'load capacity' },
            { param: orbitDuration, title: 'orbit duration' },
            { param: firstFlight, title: 'first flight' },
        ];
        return addParam;
    }
    return null
};


export { additionInfo};
