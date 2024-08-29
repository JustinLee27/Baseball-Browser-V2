"use client";
import Navbar from '../../../components/navbar'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './selectTeamStyles.css';

export default function SelectTeam() {
  const [data, setData] = useState([]);
  const [teamName, setTeamName] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const team_id = searchParams.get('team_id');

  useEffect(() => {
    if (!team_id) {
      console.error('team_id must be provided');
      return;
    }

    fetch(`http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${team_id}`)
      .then(response => response.json())
      .then(data => {
        setData(data.roster_40.queryResults.row);
        setTeamName(data.roster_40.queryResults.row[0].team_name);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [team_id]);

  console.log(data);

  return (
    <body className="container">
      <Navbar />
      <h1>{teamName}</h1>
      <h2>Current 40 Man Roster</h2>
      {data.length > 0 ? (
        data.map((player, index) => (
          <div key={index} className="player">
            {player.name_full} - {player.position_txt}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </body>
  );
}