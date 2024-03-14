import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import "../BBA_Documents/pdf.css";
import { BaseUrl } from "./CommonUrl";
import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
const PdfView = () => {
  const useParam = useParams();
  let navigate = useNavigate();
  //full screen
  const handle = useFullScreenHandle();
  const [fullscreenbutoon, setfullscreenbutoon] = useState(true);
  const [fullscreenbutoonClose, setfullscreenbutoonClose] = useState(false);

  const [DataLoader, setDataLoader] = useState(true);
  const [windowpdfzoom, setwindowpdfzoom] = useState(1.5);
  const [mobilepdfzoom, setmobilepdfzoom] = useState(1);

  const [width, setwidth] = useState(1200);
  const [height, setheight] = useState(600);

  const PreviousPage = async () => {
    console.log(useParam.recordId);
    navigate(`/ViewDocuments/${useParam.recordId}`);
    // <Navigate to={`/ViewDocuments/${useParam.recordId}`}></Navigate>
  };
  useState(() => {
    document.title = "DOCUMENTS VIEW";
    setTimeout(() => {
      setDataLoader(false);
    });

  }, [useParam.name]);

  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const PdfZoomIn = () => {
    if (width > 700) {
      if (windowpdfzoom <= 4) {
        setwindowpdfzoom((previous) => previous + 0.1);
      }
    } else {
      if (mobilepdfzoom <= 4) {
        setmobilepdfzoom((previous) => previous + 0.1);
      }
    }
  };
  const PdfZoomOut = () => {
    if (width > 700) {
      if (windowpdfzoom >= 1) {
        setwindowpdfzoom((previous) => previous - 0.1);
      }
    } else {
      if (mobilepdfzoom >= 1) {
        setmobilepdfzoom((previous) => previous - 0.1);
      }
    }
  };

  const { pdfDocument, pdfPage } = usePdf({
    file: `${BaseUrl}/uploadDoc/${useParam.name}`,
    // file: "http://localhost:3000/72.pdf",
    page,
    canvasRef,
    scale: width > 700 ? windowpdfzoom : mobilepdfzoom,
  });
  useEffect(() => {
    var w = window.innerWidth;
    var h = window.innerHeight;
    setwidth(w);
    setheight(h);

    console.log("width", width, "height", height);
  }, [width, height]);

  const hidesomebuttonwhenfullScreenIn = () => {
    setfullscreenbutoon(false);
    setfullscreenbutoonClose(true);
  };
  const hidesomebuttonwhenfullScreenOut = () => {
    setfullscreenbutoon(true);
    setfullscreenbutoonClose(false);
  };
  return (
    <>
      <Helmet>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div class="card-header1" style={{ padding: ".4em 0.8em" }}>
            <div className="">
              <h4
                className="text-center mx-auto mb-3 text-uppercase fddd"
                id="hddd"
              >
                {useParam.name.split("_")[0]}
              </h4>
            </div>
            {/* header  fgd*/}
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div></div>

              <div
                class="form-group has-search"
                style={{ marginBottom: "0px" }}
              >
                <button
                  onClick={() => navigate(-1)}
                  class="Button_primary  float-right mt-4"
                  data-dismiss="modal"
                >
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}

          <div class="card-body1" style={{ padding: "6px 8px" }}>
            {/* when switch on full screen this code will execute */}
            <div>
              <FullScreen handle={handle} className="fullscreen-enabled">
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="text-center p-2 bg-primary text-white ml-3 mt-2">
                      {" "}
                      Page {page} of {pdfDocument?.numPages}
                    </p>
                  </div>
                  <div style={{ display: "block ruby" }}>
                    <a
                      href={`${BaseUrl}/uploadDoc/${useParam.name}`}
                      // href="http://localhost:3000/72.pdf"
                      class="btn btn-primary btn-sm mr-2"
                      download
                    >
                      <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                    {fullscreenbutoon && (
                      <button
                        class="btn btn-success btn-sm mr-2"
                        onClick={() => {
                          handle.enter();
                          hidesomebuttonwhenfullScreenIn();
                        }}
                      >
                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                      </button>
                    )}
                    {fullscreenbutoonClose && (
                      <button
                        class="btn btn-danger btn-sm mr-2"
                        onClick={() => {
                          handle.exit();
                          hidesomebuttonwhenfullScreenOut();
                        }}
                      >
                        {" "}
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </button>
                    )}

                    <button class="btn btn-success btn-sm" onClick={PdfZoomIn}>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary h6 mt-2 ml-2 "
                      data-toggle="dropdown"
                    >
                      <i class="fa fa-sort-desc" aria-hidden="true"></i>
                    </button>
                    <button
                      class="btn btn-danger btn-sm ml-2"
                      onClick={PdfZoomOut}
                    >
                      <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>

                    <div class="dropdown-menu">
                      <button
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(1.5)}
                      >
                        Actual Size
                      </button>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(1)}
                      >
                        Page fit
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(2)}
                      >
                        Page Width
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(0.5)}
                      >
                        50%
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(0.75)}
                      >
                        75%
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(1)}
                      >
                        100%
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(3)}
                      >
                        150%
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => setwindowpdfzoom(4)}
                      >
                        200%
                      </a>
                    </div>
                  </div>
                </div>
                {!DataLoader && (
                  <>
                    <div class="ebookMain_div">
                      <div class="previous_page">
                        {/* Button to go to the previous page */}
                        {Boolean(pdfDocument && pdfDocument.numPages) && (
                          <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            class="btn  btn-success btn-sm opacity-100"
                          >
                            <i
                              class="fa fa-chevron-left"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                      </div>
                      <div class="next_page">
                        {/* Button to go to the next page */}
                        {Boolean(pdfDocument && pdfDocument.numPages) && (
                          <button
                            disabled={page === pdfDocument.numPages}
                            onClick={() => setPage(page + 1)}
                            class="btn  btn-success btn-sm "
                          >
                            <i
                              class="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </button>
                        )}
                      </div>
                      {/* Main viewer */}
                      {!pdfDocument && (
                        <div class="row">
                          <div class="col-md-5"></div>
                          <div class="col-md-2 mt-4">
                            <ColorRing
                              visible={true}
                              height="80"
                              width={100}
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                              ]}
                            />
                          </div>
                          <div class="col-md-5"></div>
                        </div>
                      )}

                      <canvas ref={canvasRef} class="canvasclass" />
                    </div>
                  </>
                )}
              </FullScreen>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PdfView;
