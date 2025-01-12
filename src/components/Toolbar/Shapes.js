import { Component, Fragment } from "react";
import {
  AddWrapper,
  ItemsWrapper,
  SettingsWrapper,
  ItemGroup,
  ItemIcon,
  FieldGroup,
  FieldCustomLabel,
} from "../../styledComponents/Shapes.ui";
import { SHAPES_VARIANTS, STANDARD_FONTS } from "../../config";
import { DarkBtn, FieldInput } from "../../styledComponents";
import Range from "../Range";
import Select from "../Shared/Select";

export default class Add extends Component {
  renderSettings = (selectedShape) => {
    const { shapeOperations, t, onSaveColor, savedColor, defaults } =
      this.props;
    const { variant, opacity, color, stroke = {} } = selectedShape;

    const updateOpacity = (newVal) =>
      shapeOperations.updateShape({ opacity: newVal });
    const updateStroke = (property, value) =>
      shapeOperations.updateShape({ stroke: { ...stroke, [property]: value } });
    const updatePropertyFromEvent = (e) =>
      shapeOperations.updateShape({ [e.target.name]: e.target.value });
    const removeColor = (e) => {
      onSaveColor(color);
      shapeOperations.updateShape({ color: "rgba(0,0,0,0)" });
    };
    const returnColor = (e) => {
      shapeOperations.updateShape({ color: savedColor });
    };

    const defaultSettings = (
      <Fragment key="default-settings">
        <Range
          label={t["common.opacity"]}
          min={0}
          max={1}
          step={0.05}
          range={!Number.isNaN(opacity) ? opacity : defaults?.opacity}
          updateRange={updateOpacity}
          labelBefore={true}
        />
        <FieldGroup>
          <FieldCustomLabel>Stroke Color</FieldCustomLabel>
          <FieldInput
            value={stroke.color || defaults?.stroke?.color || "#000000"}
            type="color"
            style={{
              width: 30,
              padding: 0,
              background: "transparent",
              boxShadow: "none",
            }}
            onChange={({ target: { value } }) => updateStroke("color", value)}
          />
        </FieldGroup>
        <FieldGroup>
          <FieldCustomLabel>Stroke width</FieldCustomLabel>
          <FieldInput
            value={stroke.width || defaults?.stroke?.width || 0}
            type="number"
            style={{ width: 60 }}
            onChange={({ target: { value } }) => updateStroke("width", value)}
            min={0}
          />
        </FieldGroup>
      </Fragment>
    );

    const commonSettings = (
      <FieldGroup key="common-settings-fields">
        <FieldCustomLabel>Fill Color</FieldCustomLabel>
        {color === "rgba(0,0,0,0)" ? (
          <div style={{ minWidth: 140 }}>
            <DarkBtn onClick={returnColor}>
              <span>Fill</span>
            </DarkBtn>
          </div>
        ) : (
          <div style={{ display: "flex", minWidth: 140 }}>
            <DarkBtn style={{ minWidth: 100 }} onClick={removeColor}>
              <span>Transparent</span>
            </DarkBtn>
            <FieldInput
              value={color || defaults?.color || "#000"}
              type="color"
              style={{
                width: 30,
                padding: 0,
                background: "transparent",
                boxShadow: "none",
              }}
              name="color"
              onChange={updatePropertyFromEvent}
              key="shape-color"
            />
          </div>
        )}
      </FieldGroup>
    );

    const shownSettings = [defaultSettings];

    switch (variant) {
      case SHAPES_VARIANTS.RECT:
      case SHAPES_VARIANTS.SQUARE:
      case SHAPES_VARIANTS.CIRCLE:
        shownSettings.push(commonSettings);
        break;
      case SHAPES_VARIANTS.TEXT:
        const textFontField = (
          <Fragment key="text-group-fields">
            <FieldGroup>
              <FieldCustomLabel>Text</FieldCustomLabel>
              <FieldInput
                id="text"
                value={selectedShape.text || "Text"}
                name="text"
                style={{ minWidth: 111 }}
                onChange={updatePropertyFromEvent}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldCustomLabel>Font family</FieldCustomLabel>
              <Select
                list={STANDARD_FONTS}
                valueProp="value"
                id="textFont"
                value={selectedShape.textFont || "Arial"}
                style={{ width: 111 }}
                onChange={(value) =>
                  updatePropertyFromEvent({
                    target: { name: "textFont", value },
                  })
                }
                color="text-font"
                notRelativePosition
              />
            </FieldGroup>
            <FieldGroup>
              <FieldCustomLabel>Font size</FieldCustomLabel>
              <FieldInput
                value={selectedShape.textSize}
                type="number"
                style={{ width: 60 }}
                name="textSize"
                onChange={updatePropertyFromEvent}
                min={0}
              />
            </FieldGroup>
          </Fragment>
        );
        shownSettings.unshift(textFontField, commonSettings);
        break;
      case SHAPES_VARIANTS.IMAGE:
        const urlField = (
          <FieldGroup key="url-field">
            <FieldCustomLabel>URL</FieldCustomLabel>
            <FieldInput
              id="img"
              value={
                typeof selectedShape.img === "object"
                  ? selectedShape.img.src
                  : selectedShape.img || ""
              }
              name="img"
              style={{ minWidth: 111 }}
              onChange={updatePropertyFromEvent}
            />
          </FieldGroup>
        );
        shownSettings.unshift(urlField);
        break;
      default:
        break;
    }

    return shownSettings;
  };

  render() {
    const { availableShapes, selectedShape = {} } = this.props;
    const isShapeSelected = Object.keys(selectedShape).length;

    return (
      <AddWrapper>
        {isShapeSelected === 0 ? (
          <ItemsWrapper>
            {availableShapes.map(
              ({ label, content, iconStyles, drawFn, iconUrl }) => (
                <ItemGroup key={label} onClick={() => drawFn()}>
                  <ItemIcon
                    style={iconStyles}
                    isIconNotProvided={
                      !Boolean(content || iconUrl || iconStyles)
                    }
                  >
                    {content ||
                      (iconUrl && <img src={iconUrl} alt={`${label} icon`} />)}
                  </ItemIcon>
                  <label>{label}</label>
                </ItemGroup>
              )
            )}
          </ItemsWrapper>
        ) : (
          <SettingsWrapper>
            {this.renderSettings(selectedShape)}
          </SettingsWrapper>
        )}
      </AddWrapper>
    );
  }
}
