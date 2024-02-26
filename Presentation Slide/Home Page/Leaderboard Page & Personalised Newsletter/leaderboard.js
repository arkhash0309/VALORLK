var text, parser, xmlDoc;
text = `<leaderboard>
<player>
    <fullname>Sherlock Holmes</fullname>
    <score>70</score>
</player>
<player>
    <fullname>Kevin Anderson</fullname>
    <score>55</score>
</player>
<player>
    <fullname>Steve Harvey</fullname>
    <score>50</score>
</player>
<player>
    <fullname>Jake Peralta</fullname>
    <score>60</score>
</player>
<player>
    <fullname>Jane Watson</fullname>>
    <score>50</score>
</player>
<player>
    <fullname>Peter Parker</fullname>>
    <score>90</score>
</player>
<player>
    <fullname>Nezuko Chan</fullname>
    <score>60</score>
</player>
<player>
    <fullname>Kamado Tanjiro</fullname>
    <score>80</score>
</player>
<player>
    <fullname>SinCosTan</fullname>
    <score>60</score>
</player>
<player>
    <fullname>Albert Einstein</fullname>
    <score>40</score>
</player>
</leaderboard>`
parser = new DOMParser();   
xmlDoc = parser.parseFromString(text,"text/xml");   //parsing the XML doc data which is assign to the 'text' variable using XML DOM Parser 
const playerNodes = xmlDoc.getElementsByTagName("player"); //Getting all the players in the xmlDoc and assigning them to playerNodes NodeList Object
		const players = [];
		for (let i = 0; i < playerNodes.length; i++) {
			const player = {};
			player.name = playerNodes[i].getElementsByTagName("fullname")[0].textContent;   //assigning playerNodes 'i'th index fullname value to player.name
			player.score = parseInt(playerNodes[i].getElementsByTagName("score")[0].textContent);   //assigning playerNodes 'i'th index values points to player.score
			players.push(player);   //pusing player to players array
		}

		// Sorts the players array in descending order based on score
		players.sort((a, b) => b.score - a.score);  /*The comparison passed as the parameter, will take two player objects a and b as input and returns
        the result of subtracting b.score from a.score. if it returns a negative value player 'b' will be after player 'a' and vice versa*/

const leaderboard = document.getElementById("leaderboard");	
let prevPlayerScore = 0;        //to ensure that the players with the same score get the same rank
let prevRank = 1;
// Loop through the array and generate a row for each player
for (let i = 1; i <= players.length; i++) {
    const person = players[i-1];
    
    const row = document.createElement("tr");
    const badgeCell = document.createElement("td");
    const rankCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    row.className = "rank-holders";
    nameCell.textContent = person.name; //namecell contains player fullname
    scoreCell.textContent = person.score;   //scorecel contains player points

    if(person.score == prevPlayerScore){
        rankCell.textContent = prevRank;    //assigniing all the player with the same score a same rank
    }else{
        rankCell.textContent = i;
        prevRank = i;
        prevPlayerScore = parseInt(person.score);
    }

    if(prevRank==1 ){   //getting the top scorer
        row.id = "first-place";
        const goldBadgeImg = document.createElement("img");
        goldBadgeImg.src = "CanvaGoldBadge.png";
        goldBadgeImg.alt = "Gold Badge";
        badgeCell.appendChild(goldBadgeImg);
    }else if(prevRank==2){  //getting the second top scorer
        row.id = "second-place";
        const silverBadgeImg = document.createElement("img");
        silverBadgeImg.src = "CanvaSilverBadge.png";
        silverBadgeImg.alt = "Silver Badge";
        badgeCell.appendChild(silverBadgeImg);
    }else if(prevRank==3){  //getting the third top scorer
        row.id = "third-place";
        const bronzeBadgeImg = document.createElement("img");
        bronzeBadgeImg.src = "CanvaBronzeBadge.png";
        bronzeBadgeImg.alt = "Bronze Badge";
        badgeCell.appendChild(bronzeBadgeImg);
    }

    // Append the cells to the table row
    row.appendChild(badgeCell);
    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    
    // Append the row to the leaderboard table body
    leaderboard.appendChild(row);
}
    