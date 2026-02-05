import "./duration-slider.scss";
import React, { useState } from "react";

const DurationSlider = ({ 
    durationRange = [],
    onChange = () => {}
}) => {
    // ************* component state's *************
    const [selectedValue, setSelectedValue] = useState(durationRange[2].value);

    // ************* on dragging/clicking range handler-function *************
    const handleSliderChange = (e) => {
        setSelectedValue(Number(e.target.value));
        onChange(Number(e.target.value));
    };

    // ************* on clicking range-label handler-function *************
    const handleLabelClick = (value) => {
        setSelectedValue(value);
        onChange(value);
    };

    // ************* duration-slider-ksx *************
    return (
        <div className="wrapper">
            <div className="wrapper__range">
                <div className="wrapper__range__range-container">
                    <input
                        type="range"
                        min={0}
                        max={durationRange.length - 1}
                        value={durationRange.findIndex((d) => d.value === selectedValue)}
                        step={1}
                        onChange={(e) => handleSliderChange({
                            target: { value: durationRange[Number(e.target.value)].value },
                        })}
                    />
                </div>

                <div className="wrapper__range__label-container">
                    {durationRange.map(
                        (duration, index) => (
                            <div
                                key={index}
                                className={`wrapper__range__label-container__label-box ${
                                    index === 0
                                        ? "label-box-0"
                                        : index === 1
                                            ? "label-box-1"
                                            : index === 2
                                                ? "label-box-2"
                                                : index === 3
                                                    ? "label-box-3"
                                                    : "label-box-4"
                                    }`}
                                onClick={() => handleLabelClick(duration.value)}
                            >
                                <div className="wrapper__range__label-container__label-box__label">{duration.label}</div>

                                {/* <div className="wrapper__range__label-container__label-box__abbrev">{duration.abbreviation}</div> */}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );


};

export default DurationSlider;