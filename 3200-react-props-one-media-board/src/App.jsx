import "./main.css";
import React, { Component } from "react";
import { videos, sounds, images, familyMembers } from "./Data.jsx";
import Video from "./Video.jsx";
import SoundWidget from "./SoundWidget.jsx";
import Image from "./Image.jsx";
import FamilyMember from "./FamilyMember.jsx";
class App extends Component {
  render() {
    return (
      <div>
        {videos.map(vd => {
          return <Video header={vd.name} videoId={vd.id} footer={vd.caption} />;
        })}
        {sounds.map(sd => {
          return <SoundWidget url={sd.location} caption={sd.caption} />;
        })}
        {images.map(img => {
          return <Image url={img.url} caption={img.caption} />;
        })}
        {familyMembers.map(familyMember => {
          return (
            <FamilyMember name={familyMember.name} quote={familyMember.quote} />
          );
        })}
      </div>
    );
  }
}
export default App;
