import React, { useState, useEffect } from "react";
import TinderProfileDetails from "../Dialog/TinderProfileDetails";
import UnavailableImage from "../../assets/images/unavailable_img.jpg";

import API from "../../api";
//
import Button from "@material-ui/core/Button";
//
import swal from "@sweetalert/with-react";

const ProfileImage = ({ dataPath, user }) => {
  const [tinderProfilesData, setTinderProfilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState([]);

  const handleClickOpen = (props) => {
    setOpen(true);
    setSelectedValue(props);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    //console.log("use effect data runs");
    const fetchData = async () => {
      setIsLoading(true);
      const result = await API(dataPath);
      //console.log("result", result.data);
      setTinderProfilesData(result.data.data);
    };
    fetchData().then(() => {
      //setTinderProfilesData(result.data);
      setIsLoading(false);
    });
  }, []);

  function handleAddTinderProfiles() {
    if (!user) {
      swal(
        "Oh noes!",
        "You need to register/login to access this feature",
        "error"
      );
    } else {
      swal({
        title: "Enter your Tinder Access Token ",
        text: "(You can find it at the Tinder Network Extension)",
        content: "input",
        button: {
          text: "Search!",
          closeModal: false,
        },
      })
        .then(async (input) => {
          if (!input) throw null;
          const { data: results } = await API.post("tinder/profiles/", {
            tinder_access_token: input,
          });
          return results;
        })
        .then((results) => {
          if (!results) {
            return swal("No profiles found!");
          }
          swal(
            <div>
              <div>
                <h1>Congratulations!</h1>
                <p>{results.message}</p>
              </div>

              {results.tinderProfiles.map((profile, index) => (
                <div>
                  <img
                    key={index}
                    src={profile.photos[0]}
                    alt={profile.name}
                  ></img>
                  <div>{profile.name}</div>
                </div>
              ))}
            </div>
          );
        })
        .catch((err) => {
          if (err) {
            swal(
              "Oh noes!",
              "The request failed. Update your tinder access token",
              "error"
            );
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    }
  }

  return (
    <div>
      <div>
        Profiles{" " + tinderProfilesData.length}
        {dataPath !== "tinder/profiles/instagram" ? (
          <Button
            style={{
              backgroundColor: "#008CBA",
              position: "fixed",
              left: "90%",
              top: "80%",
              bottom: "10%",
              display: "flex",
              flexDirection: "column",
              height: "50px",
              width: "15px",
              borderRadius: "50%",
              fontSize: "50px",
            }}
            onClick={handleAddTinderProfiles}
            variant="contained"
            color="primary"
          >
            +
          </Button>
        ) : null}
      </div>
      <div>
        {tinderProfilesData.map((profile, index) => (
          <img
            style={{
              height: "216px",
              width: "172px",
            }}
            key={index}
            src={profile.photos[0]}
            alt={profile.name}
            onClick={() => handleClickOpen(profile)}
            onError={(event) =>
              event.target.setAttribute("src", UnavailableImage)
            }
          ></img>
        ))}
        {tinderProfilesData && (
          <TinderProfileDetails
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
