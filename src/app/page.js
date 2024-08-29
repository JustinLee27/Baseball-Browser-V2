"use client";
import Navbar from '../../components/navbar'
import styles from './page.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order='name_asc'&season='2024'")
      .then(response => response.json())
      .then(data => {
        setData(data.team_all_season.queryResults.row);
        setLoading(false);
      })
      .catch(error => {
        setLoading(true);
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(data);

  const handleTeamChange = (event) => {
    const teamId = event.target.value;
    setSelectedTeam(teamId);
    router.push(`/SelectTeam?team_id=${teamId}`);
  };

  return (
    <body className={styles.background}>
      <Navbar />
      <div className={styles.select}>
        {!loading && (
          <select value={selectedTeam} onChange={handleTeamChange}>
            <option value="" className={styles.option}>Select a team</option>
            {data.map((team) => (
              <option key={team.mlb_org_id} value={team.mlb_org_id} className={styles.option}>
                {team.name_display_full}
              </option>
            ))}
          </select>
        )}
        {loading && <p>loading</p>}
      </div>
    </body>
  );
}
