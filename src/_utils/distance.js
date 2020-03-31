export default function distance(first, second) {
    const lat1 = first.latitude;
    const lon1 = first.longitude;
    const lat2 = second.latitude;
    const lon2 = second.longitude;
	var R = 6371000; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	// if (d>1) return Math.round(d)+"km";
	// else if (d<=1) return Math.round(d*1000)+"m";
	return d;
}


