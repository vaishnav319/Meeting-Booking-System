import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import MentorItem from "./MentorItem";
import PropTypes from "prop-types";
import { getMentorProfiles } from "../../actions/profile";
import Search from "./Search";
import { connect } from "react-redux";
const Students = ({
  getMentorProfiles,
  profile: { mentorProfiles, loading },
}) => {
  useEffect(() => {
    getMentorProfiles();
  }, [getMentorProfiles]);
  const [searchQuery, setSearchQuery] = useState();
  const filterProfiles = (mentorProfiles, query) => {
    if (!query) {
      return mentorProfiles;
    }

    return mentorProfiles.filter((profile) => {
      const name = profile.user.name.toLowerCase();
      if (name.toLowerCase().includes(query.toLowerCase())) {
        return name.toLowerCase().includes(query.toLowerCase());
      }

      const subject = profile.user.subject.toLowerCase();
      return subject.toLowerCase().includes(query.toLowerCase());
    });
  };
  mentorProfiles = filterProfiles(mentorProfiles, searchQuery);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment className="">
          <div className="flex justify-between flex-wrap">
            <div>
              <h1 className="large text-primary">Mentors</h1>
              <p className="lead">
                <i className="fab fa-connectdevelop" /> Browse and connect with
                Mentors
              </p>
            </div>
            <div className="max-h-16 my-auto">
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <div className="md:text-center sm:text-center flex flex-wrap">
            {mentorProfiles.length > 0 ? (
              mentorProfiles.map((profile) => (
                <MentorItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4 className="m-auto mt-10 text-3xl">
                No Mentor Profiles found
                <br />
                <i className="far fa-frown mt-3 text-5xl"></i>
              </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Students.propTypes = {
  getMentorProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getMentorProfiles })(Students);
