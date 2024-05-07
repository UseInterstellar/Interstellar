// Function to calculate the distance between two sets of coordinates (lotta math)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function getNearestServer(serverObject) {
    let nearestServerUrl = null;
    let minDistance = Infinity;

    for (const serverKey in serverObject) {
        const server = serverObject[serverKey];
        const distance = parseFloat(server.distance);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestServerUrl = server.url;
        }
    }

    return nearestServerUrl;
}

// Get the closest server to the user based on their IP (for multi server)
export function getMultiServer() {
    if (sessionStorage.getItem("msrv") !== "DISABLED") {
        return null;
    } else {
        if (sessionStorage.getItem("msrv") === null) {
                fetch("/sl")
                    .then(response => response.json())
                    .then(multiServerData => {
                        const multiServerEnabled = multiServerData.enabled;
                        if (multiServerEnabled) {
                            fetch("https://ipapi.co/json/")
                                .then(response => response.json())
                                .then(ipData => {
                                    const userLatitude = ipData.latitude;
                                    const userLongitude = ipData.longitude;
                                    const multiServerList = multiServerData.servers;
                                    const serverDistanceMap = {};
                                    for (const serverKey in multiServerList) {
                                        if (multiServerList.hasOwnProperty(serverKey)) {
                                            const server = multiServerList[serverKey];
                                            const serverLatitude = server.latitude;
                                            const serverLongitude = server.longitude;
                                            const distance = calculateDistance(userLatitude, userLongitude, serverLatitude, serverLongitude).toFixed(3);
                                            serverDistanceMap[serverKey] = { ...server, distance };
                                        }
                                    }
                                    const nearestServerUrl = getNearestServer(serverDistanceMap);
                                    if (nearestServerUrl !== null) {
                                        sessionStorage.setItem("msrv", nearestServerUrl);
                                        return nearestServerUrl;
                                    }
                                })
                                .catch (error => {
                                    console.error("Error getting location", error);
                                });
                        } else {
                            sessionStorage.setItem("msrv", "DISABLED");
                        }
                    })
                    .catch(error => {
                        console.error("Error loading multi-server config:", error);
                    });
            }
    }
}