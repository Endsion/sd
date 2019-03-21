import React from 'react';
import { Icon,  Upload, Button, notification, Card } from 'antd';
import { intlShape, injectIntl,FormattedMessage } from 'react-intl';
import { getToken } from '../utils/auth';
import { connect } from 'react-redux';
import { fetchUploadISOFileState, fetchUploadISOFile } from '../actions/uploadISOFile';
import { prepareUpload } from '../actions/image';

class UploadISOFile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDrag: false,
      mousePageX: undefined,
      mousePageY: undefined,
    };
  }

  handleDragMouseDown = e => {
    // TODO: use class to locale the modal
    let modalElement = e.target.parentElement.parentElement;
    if(modalElement.className === 'upload-iso-card'){
      this.setState({
          ...this.state,
          isDrag: true,
          mousePageX: e.pageX - modalElement.offsetLeft,
          mousePageY: e.pageY - modalElement.offsetTop,
      })
    }
  }

  handleDragMouseUp = e => {
      this.setState({
          ...this.state,
          isDrag: false
      })
  }

  handleDragMouseMove = e => {
      if (!this.state.isDrag) return;
      let modalElement = e.target.parentElement.parentElement;
      if(modalElement.className === 'upload-iso-card'){
        modalElement.style.top = e.pageY - this.state.mousePageY + 'px';
        modalElement.style.left = e.pageX - this.state.mousePageX + modalElement.offsetWidth/2 + 'px';
      }
  }


  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  handleClose = () =>{
    this.props.fetchUploadISOFileState({
      isVisible: false,
      image: {},
    })
  }


  render() {
    const { formatMessage } = this.props.intl;
    const { uploadisofile } = this.props;
    const that = this;
    let content = null;
    if(uploadisofile.isVisible && uploadisofile.image.id){
      
      const acceptType = `.${uploadisofile.image.diskFormat || '.vmdk,.raw,.qcow2,.vdi,.iso'}`;
      const props = {
        name: 'file',
        action: `/api/imageUpload/${uploadisofile.image.id}/file`,
        headers: {
          'X-ApiAuth-Token': getToken(),
        },
        accept: acceptType,
        beforeUpload: () => {
          return this.props.prepareUpload({id: uploadisofile.image.id}).then((data) => {
            if (data instanceof Error) {
              return Promise.reject();
            } else {
              return Promise.resolve();
            }
          });
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            that.props.fetchUploadISOFileState({ isUpload: false })
          } else {
            that.props.fetchUploadISOFileState({ isUpload: true });
          }
          if (info.file.status === 'done') {
            that.props.fetchUploadISOFileState({
              image: {},
              isVisible: false,
              isUpload: false,
            });
            that.props.fetchUploadISOFile({
              uploadSuccess: true,
            })
            notification.success({
              message: formatMessage({id: 'Snapshot_List_UploadSuccess'}),
              description: formatMessage({id: 'Snapshot_List_UploadSuccess'}),
            });
          } else if (info.file.status === 'error') {
            notification.error({
              message: formatMessage({ id: 'Snapshot_List_UploadFailed' }),
              description: formatMessage({ id: 'Snapshot_List_UploadFailed' }),
            });
            that.props.fetchUploadISOFileState({
              ...that.props.uploadisofile,
              isUpload: false,
            });
          }
        },
      };
      content = (
        <div className="upload-iso-card">
          <Card
            title={uploadisofile.image.name + formatMessage({id: 'Snapshot_List_UploadImage'})}
            extra={<Icon onClick={this.handleClose} type="close-circle-o" />}
            onMouseDown={e => this.handleDragMouseDown(e)}
            onMouseMove={e => this.handleDragMouseMove(e)}
            onMouseUp={e => this.handleDragMouseUp(e)}
            onMouseLeave={e => this.handleDragMouseUp(e)}

          >
            <Upload {...props}>
              <Button type="ghost">
                <Icon type="upload" /><FormattedMessage id="Snapshot_List_UploadImage" />
              </Button>
            </Upload>
          </Card>
        </div>
      );
    }

    return content;
  }
}

UploadISOFile.contextTypes = {
  router: React.PropTypes.object,
};

UploadISOFile.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state) {
  return {
    uploadisofile: state.uploadisofile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUploadISOFileState: (params) => dispatch(fetchUploadISOFileState(params)),
    prepareUpload: (params) => dispatch(prepareUpload(params)),
    fetchUploadISOFile:(params)=>dispatch(fetchUploadISOFile(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UploadISOFile));
