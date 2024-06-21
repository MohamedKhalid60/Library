import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import { Link, Outlet } from "react-router-dom";

// In your JSX:

export default function Dashboard() {
  return (
    <>
      <section className="dashboard ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <aside id="sidebar" class="sidebar">
                <ul class="sidebar-nav" id="sidebar-nav">
                  <li class="nav-item">
                    <Link to={"dashblist"}>
                      <FontAwesomeIcon
                        className="icon pe-2"
                        icon={faTachometerAlt}
                      />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <ul>
                    <li>
                      <Link to={"admin"}>
                        <FontAwesomeIcon
                          className=" icon pe-2"
                          icon={faUsers}
                        />
                        Admin
                      </Link>
                    </li>
                    <li>
                      <Link to={"users"}>
                        <FontAwesomeIcon
                          className=" icon pe-2"
                          icon={faUsers}
                        />
                        users
                      </Link>
                    </li>
                    <li>
                      <Link to={"books"}>
                        <FontAwesomeIcon className="icon pe-2" icon={faBook} />
                        books
                      </Link>
                    </li>
                  </ul>
                </ul>
              </aside>
            </div>
            <div className="col-lg-9">
              <div className="card">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
